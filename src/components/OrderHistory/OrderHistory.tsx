import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

type OrderType = {
  id: string;
  full_name: string;
  total_price: number;
  created_at: string;
  // هر فیلد دیگه که نیاز داری
};

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h2>Your Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id} style={{marginBottom: 15, borderBottom: "1px solid #ccc", paddingBottom: 10}}>
            <div><strong>Order ID:</strong> {order.id}</div>
            <div><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</div>
            <div><strong>Total Price:</strong> {order.total_price.toLocaleString()} Tomans</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
