import React from "react";
import Banner from "../_components/Banner";

type Props = {};

export const revalidate = 0

const TermsAndConditionsPage = (props: Props) => {
  return (
    <div>
      <Banner label="Terms & Conditions" />

      <div className="mt-12">
        <div className="max-w-5xl mx-auto p-6 space-y-6 text-gray-800">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Terms & Conditions
          </h1>

          {/* Pickup & Return Instructions */}
          <section>
            <p className="font-semibold">
              Car rental vehicle pick up and return instructions are as follow.
            </p>
            <p className="font-bold">CUSTOMER PICK UP / RETURN —</p>
            <p>
              Complimentary customer pickup - Airport terminal gates, Near by
              hotels, Lax Green-line Metro station. Please contact the rental
              location directly if you are in need of these services.
            </p>
            <p>
              Contact # <br/>
              <span className="font-bold">(310) 294-6980  LOS ANGELES LOCATION</span>
            </p>
            <p>
              <span className="font-bold">(702) 533-3116  LAS VEGAS LOCATION</span>
            </p>

            <p className="font-bold mt-4">AFTER-HOURS DROP OFF</p>
            <p>
            Eagle Car Rental is a 24-hour operation company. Locations are open 7 days a week. If you need to RETURN a vehicle, please advise a representative If you have any question regarding how to return a car & instructions.
            </p>

            <p className="font-bold mt-4">Los Angeles Pickup and Drop off Address Lax office location is located —</p>
            <p>(1009 W Arbor Vitae St. Inglewood, CA, 90301)</p>
            <p className="font-bold mt-4">Las Vegas Pickup and Drop off Address</p>
            <p>(205 E Warm Springs Road suite 106 Las Vegas NV 89119)</p>
          </section>

          {/* One-Way Returns */}
          <section>
            <p className="font-bold">ONE-WAY RETURNS —</p>
            <p>
            Vehicles rented from LA locations that return to Las Vegas will automatically be charged a drop fee of $750; same fee applies if rented in Las Vegas and returned in Los Angeles. Vehicles not returned to the original rental location will be charged a “drop fee. If you return the car to any other state or city the one-way recovery fee will be charged which can be as much as 4500$ or up to 7500$.
            </p>
          </section>

          {/* Payment Policy */}
          <section>
            <p className="font-bold">
              CREDIT CARD & Debit Card- (POLICY) ACCEPTABLE FORMS OF PAYMENT.
            </p>

            <p className="text-red-600 font-bold mt-4">
              ** IMPORTANT TO READ **
            </p>
            <p>
            For rental charge authorizations or deposits. Credit cards & Debit card MUST be valid and must match the renters Driver’s License. The authorization amount (rental deposit) is separate from the payment (rental charges). At the time of rental, the authorization (deposit) and separate payment for entire rental will be made on renters’ credit card or debit card. Customers will see two transactions on their statement.
            </p>

            <p>
            We can accept debit cards for rental vehicles in person and as final payment ONLY. Only the renter of a vehicle can make this payment. Again…. Rental deposit authorization must be made on a major credit card or debit card or cash deposit at the beginning of rental. We do take CASH DEPOSITS ALLOWED ON ANY VEHICLE – BUT MUST HAVE A VALID full coverage personal auto insurance.
            </p>

            <p>
            The authorization, or portion thereof, may be used for any additional charges accumulated during the rental contract period beyond what was already taken for payment at the beginning of the rental. Authorization amounts depend on the type of vehicle and are separate from the rental charges.
            </p>
            <p>
            SUV’s, Premium, Luxury and Higher vehicles have higher authorization depending on the value of the vehicle and length of rental. Credit card and debit card authorizations are valid for 30 days and may be used for unpaid rental charges and incidentals such as gas, tickets, or tolls. Upon the release of the authorizations, depending on the issuing bank, it may take 3-10 business days for the bank to return the authorization. International credit cards or debit cards may have additional fees or longer wait time for authorizations to be refunded. THIRD PARTY BILLING is only permitted when setting up insurance billing, or a corporate account with the completion of our credit card charge form, approved by management. Paying parties must give written consent along with accompanying requested documents (copy of the credit card and Debit card associated driver’s license) pending final approval from Eagle car rental management.
            </p>
 
          </section>

          {/* Drivers License & Insurance */}
          <section>
            <p className="font-bold">DRIVERS LICENSE, INSURANCE, & COVERAGES</p>

            <p className="font-bold mt-4">DRIVERS LICENSE POLICY —</p>
            <p>
            All renters and additional drivers must have a valid government driver’s license in their possession to rent a vehicle. The original government issued license MUST be presented and must be in the name of the driver. The renter’s driver’s license must be valid for the entire rental period, with the following exception. An expired U.S. State driver’s license of U.S. military personnel on active duty is accepted at this location. The renter must present proof that he/she is on active duty. Expired licenses of U.S. military personnel returning from overseas duty are accepted for up to 60 days after discharge. An International Driving Permit (IDP) serves only as a translation of a valid driver’s license. An IDP must always be presented in conjunction with the official driver’s license of the issuing country along with a current passport. Eagle Car Rental will NOT rent to a holder of a license that restricts them to daytime driving only or to business driving only. Expired licenses will NOT be accepted. A learner’s permit is NOT accepted. A valid temporary license is accepted only with an original copy from the Department of Motor Vehicles.
            </p>

            <p className="font-bold mt-4">PROOF OF INSURANCE —</p>
            <p>
            We ask that you provide us with your insurance details (Insurance Declaration Page) at the time of booking, this will help expedite your time at the rental office so we’re not verifying your coverage while you wait. Alternatively, a conference call phone verification may be requested with the rental counter agent and insurance company, followed by a Declaration Page from the Insurance Company. For any questions or concerns regarding coverage requirements please email
            </p>
            <a
              href="mailto:eaglecarrental3@gmail.com"
              className="text-blue-600"
            >
               eaglecarrental3@gmail.com.
            </a>
          </section>

          {/* Insurance & Coverage */}
          <section>
            <p className="font-bold">ADDITIONAL VEHICLE COVERAGES</p>

            <p className="font-bold mt-4">COLLISION DAMAGE WAIVER (CDW) —</p>
            <p>
            The renter is liable for all damage to the rented vehicle regardless of fault. The renter is also liable for the loss of use (revenue lost while the car is being repaired). Renters may purchase Collision Damage Waiver (CDW) which relieves them of all financial responsibility for loss or damage to the Rental vehicle as long as they comply with the terms of the rental agreement. In California, CDW does NOT relieve the renter for theft. The cost of CDW will vary by car, group and rate. If you have rental car coverage through your personal auto insurance, you can provide that at the counter. Proof of insurance, or phone verification is required. If you have any questions, check with your insurance provider.
            </p>

            <p className="font-bold mt-4">
            RENTAL LIABILITY PROTECTION (RCLI & SLI)
            </p>
            <p>
            Qualified renters may purchase Renters Liability Protection (RLP) at the time of rental through third party. Renters purchase RLP will receive California required liability coverage. And Las Vegas required liability coverage.
            </p>
            <p>
            IF YOU WILL BE DECLINING OUR COVERAGES, you can provide your personal PROOF OF LIABILITY COVERAGE AT TIME OF RENTAL. Alternatively, conference call phone verification may be requested with the rental counter agent and insurance company, followed up with a Declaration Page from the Insurance Company.
            </p>
            <p className="font-bold mt-4">ACCIDENT LIABILITY PROTECTION</p>
            <p>
            Liability coverage is required in the State of California and Nevada You must either provide written proof of coverage or purchase. Liability coverage does not cover your rental car, it covers any damage that your vehicle would cause to any 3rd party property. Liability coverage provides third party liability protection for bodily injury ($15,000 per person, $30,000 per accident) and property damage ($5,000) to third parties, as mandated and at the limits required by California. Nevada required limits of $25,000 per person for bodily injury; $50,000 for bodily injury; $20,000 for property damage.
            </p>
          </section>

          {/* Other Policies */}
          <section>
            <p className="font-bold">OTHER POLICIES</p>

            <p className="font-bold mt-4">CONTRACT RATES —</p>
            <p>
          If your vehicle is needed beyond the due date stated at the time of the opening of the rental contract, the customer MUST return to the rental office and sign a new contract. The rate is subject to change beyond the contract rate. When a vehicle is reserved and rented, the confirmed rate is only good during that specific time on the rental contract. Any extension, or revision of the original reservation of any amount of time may result in a rate change. Rates are not pro-rated and based on market and availability.
            </p>

            <p className="font-bold mt-4">VEHICLES LEAVING CALIFORNIA —</p>
            <p>
            Vehicles leaving the state of California may be subject to mileage fees, Please check what your mileage restrictions are with our booking agent. Eagle Car Rental does not offer roadside service outside of California and Nevada. For any questions or concerns regarding our policies please email {" "}
              <a
                href="mailto: eaglecarrental3@gmail.com."
                className="text-blue-600"
              >
                eaglecarrental3@gmail.com
              </a>
            </p>

            <p className="font-bold mt-4">DRIVING AREA —</p>
            <p>
              Vehicles are strictly PROHIBITED for entry into MEXICO or CANADA.
            </p>
            <p className="font-bold">OTHER POLICIES</p>

            <p className="font-bold mt-4">ADDITONAL DRIVERS _</p>
            <p>
            Up to one additional driver is permitted on the rental contract at no extra charge if they are over 25 years of age. Underage drivers will have a $25/day fee added per driver. Additional drivers MUST be present at the time of rental pick up and present a valid driver’s license. Legal spouse of renter on contract is allowed to be an additional driver if not present at time of rental pick up; must have same place of residence. Minimum age for additional Drivers is 21.
            </p>
            <p className="font-bold mt-4">UNDER-AGE POLICY _</p>
            <p>
            Renters must be a minimum of 21 years of age. You may qualify if you are between 18 and 20 with proof of full coverage transferable insurance. If you are under 21 you MUST provide us with a copy of your insurance (Declaration Page) so we may verify policy before renting. Customer may not purchase any additional coverage; MUST HAVE THEIR OWN FULL COVERAGE THAT TRANSFERS TO A RENTED VEHICLE. If a driver is under the age of 21, Underage Driver fee is $35/day. Please contact our reservation center for more information
            </p>
            <p className="font-bold mt-4">FUEL POLICY _</p>
            <p>
            The vehicle must be returned with the same amount of fuel when vehicle was checked out. A re-fuel charge based per gallon will be charged at the end of the rental if returned with less fuel than received. If the vehicle that you reserved is not available, an alternate or upgraded vehicle may be assigned at management discretion. Customers are welcome to request a preference of make, model, or color but there is NO guarantee of that request.
            </p>
          </section>

          {/* Additional Add-ons */}
          <section>
            <p className="font-bold">ADDITIONAL ADD-ONS</p>

            <ul className="list-disc ml-6">
              <li>
              CHILD SAFETY SEATS – available with a minimum of 24-hours advance booking otherwise based on availability. The cost of the Child Safety Seat is $15.00 per day. **Rental Agency will NOT install child safety seats. This must be performed solely by the customer.
              </li>
              <li>
              PORTABLE GPS UNITS – available with 24-hours’ notice and at an additional cost of $10.00 per day.
              </li>
              <li>
              	WI-FI HOTSPOT – Some manufactures have a wi-fi hotspot built into the vehicle. When available, this can be activated for customer use. There is an activation fee of $20, plus a data charge of $30; $50 total charge. If the vehicle is kept for over 28 days, a charge of $30/month thereafter.
              </li>
            </ul>
          </section>

          {/* Cancellation Policy */}
          <section>
            <p className="font-bold">CANCELLATION POLICY —</p>
            <p>
            If you booked a car and didn’t pick it up or did not arrive at the time of pick up, your $200 deposit is non-refundable. After the contract is signed there’s no cancellation or refund on early returns/unused days. All the rental agreements are final.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <p className="font-bold">CONTACT INFORMATION</p>
            <p>
              Email:{" "}
              <a
                href="mailto:eaglecarrental3@gmail.com"
                className="text-blue-600"
              >
                eaglecarrental3@gmail.com
              </a>
            </p>
            <p>
            Los Angeles Location Cell Number  <span className="font-bold"> (310) 294-6980</span>
            </p>
            <p>
            Las Vegas location Cell Number      <span className="font-bold">(702) 533-3116</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
