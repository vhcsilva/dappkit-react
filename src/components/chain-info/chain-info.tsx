export default function ChainInfo({name, id}: {name?: string; id: string}) {
  return <div>Chain{name ? `: ${name}` : ""} Id: {id}</div>
}