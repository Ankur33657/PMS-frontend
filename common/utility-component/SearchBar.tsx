"use client"
import { Input } from "@base-ui/react"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
const SearchBar = () => {
    return (
        <div className="group flex h-12 w-full max-w-sm items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3 shadow-sm transition-all duration-200 hover:border-2 hover:border-slate-100 focus-within:border-2 focus-within:border-slate-100 focus-within:ring-2 focus-within:ring-slate-200">
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <Search
                    size={19}
                    strokeWidth={2}
                    className="shrink-0 text-slate-500 transition-colors group-focus-within:text-black"
                />

                <Input
                    type="search"
                    placeholder="Search patients, records..."
                    aria-label="Search patients and records"
                    className="h-9 min-w-0 flex-1 border-0 bg-transparent p-0 text-sm shadow-none outline-none ring-0 placeholder:text-slate-400 hover:border-0 hover:ring-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>

            <Badge
                variant="secondary"
                className="shrink-0 rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 cursor-pointer"
            >
                Search
            </Badge>
        </div>



    )
}
export default SearchBar;