import Sparkline from '@/components/Sparkline';
import { fetchMonthlyHistory } from '@/lib/supa';

export default async function PriceRow({ asset }: { asset: string }) {
  const raw = await fetchMonthlyHistory(asset);
  const data = raw.map(r => ({ btc: parseFloat(r.btc_value) }));
  const latest = data.length > 0 ? data[data.length - 1].btc.toLocaleString('en-US', {
    maximumFractionDigits: 13
  }) : '0';

  return (
    <tr className="group cursor-pointer">
      <td className="py-2">{asset.toUpperCase()}</td>
      <td className="text-right font-mono">{latest}</td>
      <td>
        <Sparkline data={data} />
      </td>
    </tr>
  );
} 