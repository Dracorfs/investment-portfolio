"use client"

import type { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  ticker: string
  type: string
  amount: number
  initial_price: number
  total_price: number
  peso_value: number
  total_pesos: number
  dollar_value: number
  delta_pesos: number
  growth: number
}

const FormatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number | 0)
}

const CalculateTotal = ({ row }: any, currency: string) => {
  const amount = parseFloat(row.getValue("amount"))
  const price = parseFloat(row.getValue(currency))
  const total = amount * price
  return total
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "ticker",
    header: "Ticker",
  },
  {
    accessorKey: "type",
    header: "Tipo de instrumento",
  },
  {
    accessorKey: "amount",
    header: "Cantidad de instrumentos",
  },
  {
    accessorKey: "USD",
    header: () => <div className="text-right">Valor compra inicial</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("USD"))
      return <div className="text-right font-medium">{FormatCurrency(amount)}</div>
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Valor total compra</div>,
    cell: ({ row }) => {
      const total = CalculateTotal({row}, 'USD')
      const formatted = FormatCurrency(total)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "ARS",
    header: () => <div className="text-right">Valor hoy Peso</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("ARS"))
      const formatted = FormatCurrency(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "total_pesos",
    header: () => <div className="text-right">Tenencia total pesos</div>,
    cell: ({ row }) => {
      const total = CalculateTotal({row}, 'ARS')
      const formatted = FormatCurrency(total)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "dollar_value",
    header: () => <div className="text-right">Valor hoy dolar</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("dollar_value"))
      const formatted = FormatCurrency(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "delta_pesos",
    header: () => <div className="text-right">Delta Pesos</div>,
    cell: ({ row }) => {
      const pesos = CalculateTotal({row}, 'ARS')
      const usd = CalculateTotal({row}, 'USD')
      const total = pesos - usd
      const formatted = FormatCurrency(total)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "growth",
    header: "Crecimiento",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("growth"))
 
      return <div className="text-right font-medium">{amount} %</div>
    },
  }
]