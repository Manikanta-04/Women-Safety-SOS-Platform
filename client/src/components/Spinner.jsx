export default function Spinner({ size = 18, borderWidth = 2 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size, borderWidth }}
    />
  )
}
