import Skeleton from './Skeleton';

const WebinarSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            
            <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </div>

            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12 opacity-60" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
};

export default WebinarSkeleton;