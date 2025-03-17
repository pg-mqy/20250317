import FadeInWrapper from "@/app/components/FadeInWrapper";
import {Introduction} from "@/app/components/Home/Introduction";
import {RotateEditor} from "@/app/components/Home/RotateEditor";

export default function Home() {
    return (
        <main>
            <FadeInWrapper>
                <Introduction/>
                <RotateEditor/>
            </FadeInWrapper>
        </main>
    )
}
