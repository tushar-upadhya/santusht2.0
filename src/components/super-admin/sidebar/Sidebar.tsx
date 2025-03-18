const Sidebar = ({ setSelectedTable }: { setSelectedTable: (table: string) => void }) => {
    return (
        <div className="w-[300px] p-4 bg-white shadow-md h-screen">
              {/* Home Section */}
              <div className="mb-6 text-center">
               
               <button
                   className="px-4 py-2 w-full  bg-green-500 text-white rounded-md hover:bg-blue-600 transition"
                   onClick={() => setSelectedTable("home")}
               >
                    Home
               </button>
           </div>
            {/* Admins Section */}
            <div className="mb-6 text-center">
               
                <button
                    className="px-4 py-2 w-full  bg-green-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => setSelectedTable("admins")}
                >
                     Admins
                </button>
            </div>

            {/* Institutes Section */}
            <div className="text-center">
                
                <button
                    className="px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={() => setSelectedTable("institutes")}
                >
                     Institutes
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
