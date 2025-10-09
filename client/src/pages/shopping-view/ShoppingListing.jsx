import ProductFilter from "@/components/shopping-view/Filter.jsx";
import ShoppingProductTile from "@/components/shopping-view/ProductTile.jsx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/config.js";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice/productsSlice.js";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingListing = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(currentValue) {
    setSort(currentValue);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId); // check if currently any section with any option selected
    if (indexOfCurrentSection === -1) {
      // if current section is not selected add section to copyFilters
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      // if current section is previously selected
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption); // check if the selected option of the section already exist
      if (indexOfCurrentOption === -1) {
        // if option does not exist push to respective section inside copyFilters
        copyFilters[getSectionId].push(getCurrentOption);
      } else {
        // if option already exists, remove it from respective section from copyFilters
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(copyFilters); // update filters with selected sections and options
    sessionStorage.setItem("filters", JSON.stringify(copyFilters)); // to apply filters again on page reload
  }

  useEffect(() => {
    setSort("price-lowtohigh"); // default sort value on page reload
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {}); // to apply filters again on page reload
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 boredr-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  key={productItem._id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
