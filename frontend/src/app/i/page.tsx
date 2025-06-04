import MainWindow from "@/components/main/mainWindow";
import Search from "@/components/main/Search";
import Sidebar from "@/components/main/Sidebar";

export default function Page() {
    return (
        <div className="w-full h-full flex flex-row bg-darkest">
            <Sidebar></Sidebar>

            <MainWindow></MainWindow>

            <Search></Search>
        </div>
    );
}
