import RestaurentCard from "@/components/restaurent-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { restaurants } from "@/data/data";
import { PlusCircleIcon, Search } from "lucide-react";

export default function Page() {
    return (
        <>
            <div className="flex items-center justify-between flex-wrap lg:flex-nowrap mb-5">
                <Input type="text" placeholder="Search by name...">
                    <Search width={15} height={15} className="text-input" />
                </Input>
                <Button className="md:mt-0 mt-5">
                    <PlusCircleIcon width={20} height={20} />
                    Add Restaurants
                </Button>
            </div>
            <section className="flex items-start justify-start gap-5">
                {restaurants.map((restaurant) => (
                    <RestaurentCard restaurant={restaurant} key={restaurant.id}/>
                ))}
            </section>
        </>
    );
}
