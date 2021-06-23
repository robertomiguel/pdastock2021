import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Legend,
  Area,
  AreaChart,
} from "recharts";

export const Dashboard = () => {
  const data = [
    { name: "Page a", uv: 300, pv: 3400, amt: 2200 },
    { name: "Page c", uv: 200, pv: 1400, amt: 2100 },
    { name: "Page v", uv: 400, pv: 2000, amt: 2000 },
    { name: "Page r", uv: 100, pv: 2100, amt: 2040 },
    { name: "Page 5", uv: 40, pv: 2200, amt: 3000 },
  ];

  return (
    <div>
      <div>Estadísticas de stock crítico - ventas - Bitcoin</div>
      <p>Configurable según tipo de usuario logueado</p>
      <br />
      <br />

      <div style={{ display: "inline-block" }}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
      <div style={{ display: "inline-block" }}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </div>
      <div style={{ display: "inline-block" }}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
      <div style={{display: 'inline-block'}}>
        <textarea style={{width:600, height:300}} >
          Detalle de últimos movimientos
        </textarea>
      </div>
    </div>
  );
};
