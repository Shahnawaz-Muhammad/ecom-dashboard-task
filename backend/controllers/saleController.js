import Sale from "../models/Sale.js";
import Product from "../models/Product.js";

// Sale Info
const sale = async (req, res) => {
  try {
    const { productId, quantity, revenue, date } = req.body;
    const sale = new Sale({ productId, quantity, revenue, date });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Summary Info
const summary = async (req, res) => {
  try {
    const sales = await Sale.find();
    const totalOrders = sales.length;
    const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
    res.json({ totalOrders, totalRevenue });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


const getSalesData = async (req, res) => {
  try {
    const { period = 'daily', category } = req.query;

    // Time filter
    const now = new Date();
    let startDate;

    switch (period) {
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'annually':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 1));
    }

    // Join with Product if filtering by category
    let matchStage = { date: { $gte: startDate } };
    if (category) {
      const products = await Product.find({ category });
      const productIds = products.map(p => p._id);
      matchStage.productId = { $in: productIds };
    }

    const result = await Sale.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: "$date", 
                format: period === 'daily' ? "%Y-%m-%d" :
                        period === 'weekly' ? "%G-%V" :
                        period === 'monthly' ? "%Y-%m" :
                        "%Y"
              }
            }
          },
          orders: { $sum: 1 },
          revenue: { $sum: "$revenue" }
        }
      },
      {
        $project: {
          period: "$_id.date",
          orders: 1,
          revenue: 1,
          _id: 0
        }
      },
      { $sort: { period: 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { summary, sale, getSalesData };
