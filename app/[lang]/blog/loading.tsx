import { AppContent } from "@/components/ui/app-content"

export default function BlogLoading() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex-1 h-full rounded-xl overflow-hidden bg-white shadow-sm border border-slate-900/10"
            >
              <div className="flex flex-col h-full">
                <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
                <div className="p-5 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between mt-auto">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AppContent>
    </div>
  )
}
