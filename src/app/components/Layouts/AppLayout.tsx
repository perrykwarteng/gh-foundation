"use client";

import { ReactNode, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UpcomingEvent from "../UpcomingEvent/UpcomingEvent";
import Modal from "../Modal/Modalg";

export default function Layout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onDonateClick={() => setIsModalOpen(true)} />
      <UpcomingEvent />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Donation Information"
      >
        <div className="space-y-2 text-gray-700">
          <p className="font-semibold text-[#c4a54a] uppercase">
            Golden Height Foundation
          </p>
          <p>Bank: Zenith Bank Ghana Ltd.</p>
          <p>Branch: University of Cape Coast Branch, Cape Coast</p>
          <p>Account Number: 6011427138</p>

          <hr className="my-2" />

          <p className="font-semibold">International Transfers:</p>
          <p>Branch Code: 120301</p>
          <p>Bank Code: ZEBLGHAC</p>
          <p>Bank City: ACCRA</p>
          <p>SWIFT Code: ZEBLGHAC</p>
          <p>
            Bank Address: Zenith Heights, No.31 Independence Avenue, PMB CT393,
            Accra – Ghana
          </p>
        </div>

        <div className="bg-[#f7f7f7] text-gray-700 p-3 rounded-lg mt-4">
          <p className="font-semibold">Mobile Money Details:</p>
          <p>Name: Golden Height Foundation</p>
          <p>Mobile Money: +233 54 123 4567</p>
        </div>

        {/* <button className="mt-6 w-full bg-[#C4A54A] text-white py-2 rounded-lg font-medium hover:bg-[#a3893a] transition">
          Donate Now
        </button> */}
      </Modal>
    </div>
  );
}
