export default async function DomainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <p className="text-[var(--muted)] text-sm">domains/{slug} — coming in plan 003</p>
}
