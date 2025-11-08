import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <Label>
          <span className="text-muted-foreground">Address:</span>{" "}
          {addressInfo?.address}
        </Label>
        <Label>
          <span className="text-muted-foreground">City:</span>{" "}
          {addressInfo?.city}
        </Label>
        <Label>
          <span className="text-muted-foreground">Pincode:</span>{" "}
          {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="text-muted-foreground">Phone:</span>{" "}
          {addressInfo?.phone}
        </Label>
        <Label>
          <span className="text-muted-foreground">Notes:</span>{" "}
          {addressInfo?.notes}
        </Label>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
