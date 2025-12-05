import { createServer } from "@/app/lib/supabase";

export default async function OrdersPage() {
  const supabase = await createServer();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p>You must log in to view your orders.</p>;
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("buyer_id", user.id);

  return (
    <main>
      <h1>Your Orders</h1>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </main>
  );
}
