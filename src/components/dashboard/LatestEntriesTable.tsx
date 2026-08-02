import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  METHOD_LABEL,
  ROAST_LABEL,
  SPECIES_LABEL,
  type CoffeeEntry,
} from "@/types/coffee";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LatestEntriesTable({ entries }: { entries: CoffeeEntry[] }) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Últimos registros</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {entries.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nenhum consumo registrado.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Torra</TableHead>
                <TableHead>Espécie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(entry.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{entry.volume_ml} ml</TableCell>
                  <TableCell>{METHOD_LABEL[entry.brewing_method]}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ROAST_LABEL[entry.roast]}</Badge>
                  </TableCell>
                  <TableCell>
                    {entry.species === "other"
                      ? (entry.species_custom ?? SPECIES_LABEL.other)
                      : SPECIES_LABEL[entry.species]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
