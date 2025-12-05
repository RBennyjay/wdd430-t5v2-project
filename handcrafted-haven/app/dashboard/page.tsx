import { createServer } from "@/app/lib/supabase";

export default async function DashboardPage() {
  const supabase = await createServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">Welcome, {user.email}</h1>
    </div>
  );
}
