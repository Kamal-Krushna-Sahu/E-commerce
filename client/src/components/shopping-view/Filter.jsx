import { filterOptions } from "@/config/config.js";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-2 font-medium"
                    key={option.id}
                  >
                    <Checkbox // on page reload, the previously checked options should be checked again
                      // checked={
                      //   filters &&
                      //   Object.keys(filters).length > 0 &&
                      //   filters[keyItem] &&
                      //   filters[keyItem].indexOf(option.id) > -1
                      // } // error "controlled to uncontrolled (or vice versa)"

                      // solution-1 :- checked={ ? : } // ternary operator to handle error "controlled to uncontrolled (or vice versa)"
                      // checked={
                      //   filters &&
                      //   Object.keys(filters).length > 0 &&
                      //   filters[keyItem] &&
                      //   filters[keyItem].indexOf(option.id) > -1
                      //     ? true
                      //     : false
                      // }

                      // solution-2 :- checked={!!someValue} // force boolean to handle error "controlled to uncontrolled (or vice versa)"
                      // checked={
                      //   !!(
                      //     filters &&
                      //     Object.keys(filters).length > 0 &&
                      //     filters[keyItem] &&
                      //     filters[keyItem].indexOf(option.id) > -1
                      //   )
                      // }

                      // solution-3 :- checked={someValue ?? false} // nullish coalescing operator(??) to handle error "controlled to uncontrolled (or vice versa)"
                      checked={
                        (filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1) ??
                        false
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)} // to update filters after change in checked options
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="mt-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
