"use client"
import {Skeleton} from "antd";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Skeleton active />
        </div>
    );
}
