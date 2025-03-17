import FadeInWrapper from "@/app/components/FadeInWrapper";

import PDFRotator from "@/app/components/Home/PDFRotator";
import {Introduction} from "@/app/components/Home/Introduction";


export default function Home() {
    return (
        <main className='bg-green-1 pb-36'>
            <FadeInWrapper>
                <Introduction/>
                <PDFRotator/>
            </FadeInWrapper>
        </main>
    )
}
