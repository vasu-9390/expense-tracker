export const CATEGORIES = [
  { name: "Rent", icon: "🏠", color: "#38bdf8", budget: 15000 },
  { name: "Food", icon: "🍛", color: "#34d399", budget: 8000 },
  { name: "Shopping", icon: "🛍️", color: "#f472b6", budget: 5000 },
  { name: "EMIs", icon: "💳", color: "#fbbf24", budget: 10000 },
  { name: "Utilities", icon: "⚡", color: "#a78bfa", budget: 3000 },
  { name: "Travel", icon: "🚗", color: "#fb923c", budget: 4000 },
  { name: "Subscriptions", icon: "📱", color: "#2dd4bf", budget: 2000 },
  { name: "Investments", icon: "📈", color: "#86efac", budget: 5000 },
  { name: "Other", icon: "📦", color: "#94a3b8", budget: 3000 },
];

export const PAYMENT_METHODS = ["Cash", "UPI", "Card", "Net Banking"];

export const DEMO_EXPENSES = [
  { id: 1, title: "Apartment Rent", category: "Rent", amount: 14000, date: "2025-03-01", method: "UPI" },
  { id: 2, title: "Weekly Groceries", category: "Food", amount: 3200, date: "2025-03-03", method: "Card" },
  { id: 3, title: "New Shoes", category: "Shopping", amount: 2800, date: "2025-03-05", method: "Card" },
  { id: 4, title: "Phone EMI", category: "EMIs", amount: 4500, date: "2025-03-07", method: "UPI" },
  { id: 5, title: "Electricity Bill", category: "Utilities", amount: 1200, date: "2025-03-08", method: "Net Banking" },
  { id: 6, title: "Cab Rides", category: "Travel", amount: 1800, date: "2025-03-10", method: "UPI" },
  { id: 7, title: "Netflix + Spotify", category: "Subscriptions", amount: 849, date: "2025-03-02", method: "Card" },
  { id: 8, title: "SIP Investment", category: "Investments", amount: 5000, date: "2025-03-01", method: "Net Banking" },
  { id: 9, title: "Restaurant Dinner", category: "Food", amount: 1400, date: "2025-03-12", method: "Card" },
  { id: 10, title: "Miscellaneous", category: "Other", amount: 600, date: "2025-03-11", method: "Cash" },
];

export const DEMO_USERS = [
  { id: 1, name: "Arjun Mehta", email: "arjun@example.com", password: "1234", salary: 50000, avatar: "AM" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", password: "1234", salary: 65000, avatar: "PS" },
];

export const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "add", icon: "➕", label: "Add Expense" },
  { id: "history", icon: "📋", label: "History" },
  { id: "reports", icon: "📈", label: "Reports" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];