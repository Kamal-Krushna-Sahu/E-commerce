import ProductImageUpload from "@/components/admin-view/ImageUpload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config/config";
import { useState } from "react";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  function onSubmit() {}

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent
          side="right"
          className="p-6 overflow-auto"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText="add"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
