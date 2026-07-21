import { Javascript } from "@dev.icons/react";
import StackIcon from "./StackIcon";

export default function Stack() {
    return(
        <>
            <div className="flex flex-col gap-y-3 overflow-visible">
                <div className="flex flex-col gap-y-3">
                     <span className="text-xs font-light secondary-text-color">FRONTEND</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-8 overflow-visible py-1 pb-10">
                        <StackIcon name="Javascript">
                            <Javascript size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Javascript">
                            <Javascript size={40} className="rounded-md" />
                        </StackIcon>
                    </div>
                </div>
            </div>
        </>
    );
}
