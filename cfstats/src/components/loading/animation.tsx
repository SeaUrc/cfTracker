import './animation.css';

export default function loading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="mt-96 flex flex-col items-center">
                <div className="loader">
                </div>
                <div className="p-5">
                    Taking a while? Try reloading
                </div>
            </div>
        </div>

    )
}