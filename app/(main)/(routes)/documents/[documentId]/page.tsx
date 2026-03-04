async function DocumentPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;

  return <div>{documentId}</div>;
}
export default DocumentPage;
