export default function ChainInfo({name, id}: {name?: string; id: string}) {
  return <div>Chain{name ? `: ${name}` : ""} {id ? `Id: ${id}` : ""}</div>
}