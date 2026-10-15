
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
const InPatientDetailsCard = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                        Patient Registry
                    </h2>
                    <p className="text-sm text-slate-500">
                        Manage and view registered patients
                    </p>
                </div>

                <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {9} patients
                </span>
            </div>
            <div className="h-[calc(100vh-100px)] overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => (
                        <Card key={id} className="min-w-0">
                            <CardHeader>
                                <CardTitle>BED</CardTitle>
                                <CardDescription>R1-A-403</CardDescription>
                                <CardAction>Occupied</CardAction>
                            </CardHeader>

                            <CardContent>
                                <div className="flex min-w-0 flex-col gap-3">
                                    <div className="grid grid-cols-[3fr_2fr] gap-3">
                                        <h2 className="min-w-0 break-words">
                                            Namedknsklnsdkn;dlnv;df''vsdv'nksenojerjsebbrei
                                        </h2>

                                        <h2 className="min-w-0 break-words">
                                            Idkltthnokjfebjkbjebrg
                                        </h2>
                                    </div>

                                    <h2 className="break-words [overflow-wrap:anywhere]">
                                        Attending: Dr. Anita Tailorkbfubeiosbiehifhihfhepofhpeohophopefhpofeh
                                    </h2>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Badge</Badge>
                                        <Badge variant="destructive">Badge</Badge>
                                        <Badge variant="default">Badge</Badge>
                                        <Badge variant="outline">Badge</Badge>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <div className="flex min-w-0 flex-col gap-2">
                                    <h2 className="break-words">
                                        Discharge Target: Tomorrow
                                    </h2>

                                    <div className="flex flex-wrap gap-2">
                                        <h2>dcnjkdsl</h2>
                                        <h2>ddkjdsf</h2>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default InPatientDetailsCard;