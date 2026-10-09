export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <h1> Profile</h1>
      <p className="text-4xl">
        Hello,
        <span className="font-bold bg-red-800 text-white">{id}</span>
      </p>
    </>
  );
}
