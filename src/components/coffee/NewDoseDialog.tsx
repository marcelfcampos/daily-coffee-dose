import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCreateDose } from "@/hooks/useCoffeeEntries";
import {
  METHOD_LABEL,
  METHOD_OPTIONS,
  ROAST_LABEL,
  ROAST_OPTIONS,
  SIZE_LABEL,
  SIZE_OPTIONS,
  SIZE_VOLUME,
  SPECIES_LABEL,
  SPECIES_OPTIONS,
  type BrewingMethod,
  type Roast,
  type Size,
  type Species,
} from "@/types/coffee";

const itemClass =
  "rounded-lg border border-border/70 bg-background px-4 py-2 text-sm data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary";

export function NewDoseDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size | "">("");
  const [roast, setRoast] = useState<Roast | "">("");
  const [species, setSpecies] = useState<Species | "">("");
  const [speciesCustom, setSpeciesCustom] = useState("");
  const [method, setMethod] = useState<BrewingMethod | "">("");

  const { mutate, isPending } = useCreateDose();

  const isValid =
    size !== "" &&
    roast !== "" &&
    species !== "" &&
    method !== "" &&
    (species !== "other" || speciesCustom.trim().length > 0);

  function reset() {
    setSize("");
    setRoast("");
    setSpecies("");
    setSpeciesCustom("");
    setMethod("");
  }

  function handleSave() {
    if (!isValid) return;
    mutate(
      {
        size: size as Size,
        roast: roast as Roast,
        species: species as Species,
        species_custom: species === "other" ? speciesCustom.trim() : undefined,
        brewing_method: method as BrewingMethod,
      },
      {
        onSuccess: () => {
          toast.success("Dose registrada!");
          reset();
          setOpen(false);
        },
        onError: () => toast.error("Não foi possível salvar a dose."),
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova dose</DialogTitle>
          <DialogDescription>
            A data e a hora são registradas automaticamente no momento do salvamento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Quantidade</Label>
            <ToggleGroup
              type="single"
              value={size}
              onValueChange={(v) => setSize(v as Size)}
              className="flex flex-wrap justify-start gap-2"
            >
              {SIZE_OPTIONS.map((option) => (
                <ToggleGroupItem key={option} value={option} className={itemClass}>
                  {SIZE_LABEL[option]} · {SIZE_VOLUME[option]} ml
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Torra</Label>
            <ToggleGroup
              type="single"
              value={roast}
              onValueChange={(v) => setRoast(v as Roast)}
              className="flex flex-wrap justify-start gap-2"
            >
              {ROAST_OPTIONS.map((option) => (
                <ToggleGroupItem key={option} value={option} className={itemClass}>
                  {ROAST_LABEL[option]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label>Espécie</Label>
            <ToggleGroup
              type="single"
              value={species}
              onValueChange={(v) => setSpecies(v as Species)}
              className="flex flex-wrap justify-start gap-2"
            >
              {SPECIES_OPTIONS.map((option) => (
                <ToggleGroupItem key={option} value={option} className={itemClass}>
                  {SPECIES_LABEL[option]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {species === "other" && (
              <div className="space-y-1.5 pt-1">
                <Label htmlFor="species-custom">Nome da espécie</Label>
                <Input
                  id="species-custom"
                  value={speciesCustom}
                  onChange={(e) => setSpeciesCustom(e.target.value)}
                  placeholder="Ex.: Liberica"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Método de preparo</Label>
            <ToggleGroup
              type="single"
              value={method}
              onValueChange={(v) => setMethod(v as BrewingMethod)}
              className="flex flex-wrap justify-start gap-2"
            >
              {METHOD_OPTIONS.map((option) => (
                <ToggleGroupItem key={option} value={option} className={itemClass}>
                  {METHOD_LABEL[option]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isValid || isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
