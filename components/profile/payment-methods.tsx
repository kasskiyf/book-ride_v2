"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Trash2 } from "lucide-react";

// Mock data - in a real app, this would come from an API
const paymentMethods = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiry: "12/24",
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    last4: "8888",
    expiry: "06/25",
    isDefault: false,
  },
];

export function PaymentMethods() {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleAddCard = () => {
    // Here you would typically handle the card addition
    // For now, we'll just close the dialog
    setIsAddingCard(false);
    setCardNumber("");
    setExpiry("");
    setCvc("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Payment Methods</h2>
        <p className="text-sm text-muted-foreground">
          Manage your payment methods and preferences
        </p>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">
                  {method.type} ending in {method.last4}
                </p>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expiry}
                </p>
              </div>
              {method.isDefault && (
                <Badge variant="outline" className="ml-2">
                  Default
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add payment method
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add payment method</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCard();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 1234 1234 1234"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Add card
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}