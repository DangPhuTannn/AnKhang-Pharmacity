import { Card, CardContent, Typography } from "@mui/material";

export default function EachKPI({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <Card sx={{ minHeight: 120 }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
