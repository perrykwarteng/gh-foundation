// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
// import Modal from "../Modal/Modalg";
// import { getGlobal } from "../../lib/getGlobal";

// export default function Layout({ children }: { children: ReactNode }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [global, setGlobal] = useState(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await getGlobal();
//         setGlobal(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Failed to load global data:", error);
//       }
//     }

//     load();
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar onDonateClick={() => setIsModalOpen(true)} />
//       <UpcomingEvent />
//       <main className="flex-1 overflow-y-auto">{children}</main>
//       <Footer />

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Donation Information"
//       >
//         <div className="space-y-2 text-gray-700">
//           <p className="font-semibold text-[#c4a54a] uppercase">
//             Golden Height Foundation
//           </p>
//           <p>Bank: Zenith Bank Ghana Ltd.</p>
//           <p>Branch: University of Cape Coast Branch, Cape Coast</p>
//           <p>Account Number: 6011427138</p>

//           <hr className="my-2" />

//           <p className="font-semibold">International Transfers:</p>
//           <p>Branch Code: 120301</p>
//           <p>Bank Code: ZEBLGHAC</p>
//           <p>Bank City: ACCRA</p>
//           <p>SWIFT Code: ZEBLGHAC</p>
//           <p>
//             Bank Address: Zenith Heights, No.31 Independence Avenue, PMB CT393,
//             Accra – Ghana
//           </p>
//         </div>

//         <div className="bg-[#f7f7f7] text-gray-700 p-3 rounded-lg mt-4">
//           <p className="font-semibold">Mobile Money Details:</p>
//           <p>Name: Golden Height Foundation</p>
//           <p>Mobile Money: +233 54 123 4567</p>
//         </div>

//         {/* <button className="mt-6 w-full bg-[#C4A54A] text-white py-2 rounded-lg font-medium hover:bg-[#a3893a] transition">
//           Donate Now
//         </button> */}
//       </Modal>
//     </div>
//   );
// }

"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import Modal from "../Modal/Modalg";
import { getGlobal } from "../../lib/getGlobal";

interface BankInformation {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branch: string;
}

interface MomoInformation {
  Name: string;
  Number: string;
}

interface InternationalTransfers {
  branchCode: string;
  bankCode: string;
  bankCity: string;
  swiftCode: string;
  bankAddress: string;
}

interface Advertisement {
  content: string;
}

interface GlobalData {
  bankInformation?: BankInformation;
  momo?: MomoInformation;
  internationalTransfers?: InternationalTransfers;
  advertisement?: Advertisement;
}


export default function Layout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [global, setGlobal] = useState<GlobalData | null>(null);

  useEffect(() => {
    const loadGlobalData = async () => {
      try {
        const response = await getGlobal();
        setGlobal(response?.data?.attributes ?? null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to load global data:", error.message);
        } else {
          console.error("Failed to load global data");
        }
        setGlobal(null);
      }
    };

    loadGlobalData();
  }, []);


  const bank: BankInformation = global?.bankInformation ?? {
    bankName: "Zenith Bank Ghana Ltd.",
    accountNumber: "6011427138",
    accountName: "Golden Height Foundation",
    branch: "University of Cape Coast Branch, Cape Coast",
  };

  const momo: MomoInformation = global?.momo ?? {
    Name: "Golden Height Foundation",
    Number: "(+233) 55 685 3499",
  };

  const international: InternationalTransfers =
    global?.internationalTransfers ?? {
      branchCode: "120301",
      bankCode: "ZEBLGHAC",
      bankCity: "ACCRA",
      swiftCode: "ZEBLGHAC",
      bankAddress:
        "Zenith Heights, No.31 Independence Avenue, PMB CT393, Accra – Ghana",
    };

  const advertisementText: string =
    global?.advertisement?.content ??
    "UPCOMING EVENT IN DECEMBER 2025 — Donation of back packs, exercise books, pencil cases, pens, pencils, and other writing aids to 200 pupils. ESTIMATED COST: GHS 47,000.00 (≈ USD 3,900)";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onDonateClick={() => setIsModalOpen(true)} />

      <UpcomingEvent content={advertisementText} />

      <main className="flex-1 overflow-y-auto">{children}</main>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Donation Information"
      >
        <div className="space-y-2 text-gray-700">
          <p className="font-semibold text-[#c4a54a] uppercase">
            {bank.accountName}
          </p>
          <p>Bank: {bank.bankName}</p>
          <p>Branch: {bank.branch}</p>
          <p>Account Number: {bank.accountNumber}</p>

          <hr className="my-2" />

          <p className="font-semibold">International Transfers:</p>
          <p>Branch Code: {international.branchCode}</p>
          <p>Bank Code: {international.bankCode}</p>
          <p>Bank City: {international.bankCity}</p>
          <p>SWIFT Code: {international.swiftCode}</p>
          <p>Bank Address: {international.bankAddress}</p>
        </div>

        <div className="bg-[#f7f7f7] text-gray-700 p-3 rounded-lg mt-4">
          <p className="font-semibold">Mobile Money Details:</p>
          <p>Name: {momo.Name}</p>
          <p>Mobile Money: {momo.Number}</p>
        </div>
      </Modal>
    </div>
  );
}
