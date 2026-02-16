import React from "react";
import { Link } from "react-router-dom";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <div className="privacy-overlay">
            <div className="privacy-modal">
                <div className="privacy-header">
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <Link to="/" className="close-button">&times;</Link>
                </div>

                <div className="privacy-content">
                    <p className="privacy-intro">
                        We respect your privacy and are committed to protect the privacy and security of your personal data.
                        Pharma Empower Inc. urges you to carefully read and review this Privacy Policy statement before accessing or using this Pharma Empower Inc. website (hereinafter referred to as “Website”).
                        If you proceed to access or use this Website, you agree to abide by this Privacy Policy statement, without any exceptions.
                        You may not access or use this Website if you do not agree to this Privacy Policy statement.
                        Pharma Empower Inc. its subsidiaries, its affiliates and its group companies (hereinafter referred to as “Pharma Empower”) reserve the right to add, remove or modify this information at any time without any prior notification.
                    </p>

                    <section className="privacy-section">
                        <h2>Collection of Personal Information</h2>
                        <p>
                            The Website is not designed to collect and/or receive any personal information of you by itself.
                            Pharma Empower is not able to identify you personally unless you access the Website and/or provide any personal information.
                        </p>

                        <h3>Active collection of information</h3>
                        <p>
                            Pharma Empower collects personal information that you enter into data fields on the Pharma Empower Website.
                            For example, you may submit or share your name, postal address, email address, investor details, profession, photograph, medical records and/ or other personal information in order to receive information about various subjects and services wherever applicable.
                            To protect your privacy, you should not provide Pharma Empower with any information that is not specifically requested.
                            When you register using your other accounts including Facebook, Twitter, Gmail etc., we shall retrieve information required for your registration from such account to continue to interact with you and to continue providing the services, wherever applicable.
                        </p>

                        <h3>Passive Collection of information</h3>
                        <p>
                            Pharma Empower’s Website may collect information about your visits to the Pharma Empower Website without you actively submitting such information.
                            This information may be collected using various technologies, such as cookies, Internet tags, and web beacons.
                            The Website may capture some of this information, such as the URL of the website you just visited, Internet Protocol (IP) addresses, GPS location data, mobile phone service provider, details of operating system, the browser version your computer, etc.
                            Passive information collection technologies can make your use of the Website easier by allowing Pharma Empower to provide better service, customize sites based on consumer preferences, compile statistics, analyse trends, and otherwise administer and improve the Website.
                            Such information collected by these technologies cannot be used to identity you without additional identifiable information.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Intended Use of Personally Identifiable Information</h2>
                        <p>
                            Pharma Empower will use the personal information you provide through the Website to respond to your questions, have efficient communication and to provide you with efficient service.
                            After you have entered personal information into a form or data field on the Website, Pharma Empower may use certain identifying technologies to allow that website to “remember” your personal preferences, such as sections of the Website that you visit frequently and, if you choose, your login credentials.
                        </p>
                        <p>
                            Pharma Empower shall collect, store and use your information in compliance with all applicable laws.
                            You may always limit the amount and type of personal information that Pharma Empower receives about you by choosing not to enter any personal information into forms or data fields on the Website.
                            Some of our online services can only be provided to you if you provide us with appropriate personal information.
                            Other parts of the Website may ask whether you wish to opt out or opt into our contact lists for offers, promotions and additional services that may be of interest to you.
                            If you opted to do so, we may use this information for marketing and promotional purpose.
                            For example, in accordance with applicable law and with your consent, we will use your email address to send you news and newsletters, special offers, and promotions, and to contact you about products or information we think may interest you.
                            We may also reach out to you in response to any queries posted on our Website.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Spamming</h2>
                        <p>
                            We do not support “spamming”. In accordance to your preferences, we may send periodic emails to you if you have asked us to send you information, or if you have provided your details to us while registering for any of our promotional campaigns.
                            You may choose to opt out of receiving marketing-related information through a link we include on emails you receive from us.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Non‐Disclosure of Information</h2>
                        <p>
                            Personal information on the Website may be accessed by Pharma Empower, by certain companies with which Pharma Empower may conduct joint programs, and by individuals and entities with whom Pharma Empower contracts to carry out business activities for Pharma Empower.
                        </p>
                        <p>
                            Pharma Empower does not sell or rent your personal Information to anyone else.
                        </p>
                        <p>
                            Pharma Empower may share personal information with a third party, if it is required for further processing or connection to its business.
                            During such instances the information shared will be in accordance with the confidentiality agreement with the third party and applicable law for the intended purpose for which the information was originally collected and shall ensure all such third parties comply with Pharma Empower’s Privacy Policy.
                        </p>
                        <p>
                            We may release your personal information when we believe release is required to comply with applicable law.
                            We may release personal information if, in our judgment after review, the release is compelled by law or regulation.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Protection of Personal Information</h2>
                        <p>
                            Pharma Empower will maintain adequate technical and organizational security measures to protect personal information.
                        </p>
                        <p>
                            As a policy, Pharma Empower secures each web page that collects personal information; however, the confidentiality of personal information transmitted over the Internet will not be guaranteed.
                            We urge you to exercise caution when transmitting personal information over the Internet.
                        </p>
                        <p>
                            Pharma Empower is not obliged to store your information for a period that is beyond the intended purpose for which such information was collected or submitted or to stay in compliance to applicable laws and Pharma Empower Policies and Procedures.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Links to Other Website</h2>
                        <p>
                            This Privacy Policy applies only to Pharma Empower’s Website. Pharma Empower may provide links to other websites, which we believe, may be of interest to you.
                            Pharma Empower is not responsible for the content on such websites, your access to such website links, security of personal information that you provide or any information collected by those websites.
                            The risk of accessing such websites is solely yours.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Cookies</h2>
                        <p>
                            Cookies are alphanumeric identifiers with a small amount of data that is commonly used as an anonymous unique identifier.
                            These are sent to your browser from the website that you visit and are stored on your computer’s hard drive.
                            Please note, a cookie in no way gives us access to your computer/device and cookies cannot access any other information on your computer/device.
                        </p>
                        <p>
                            Our Website uses these cookies to collect information and to improve our Service by making your interaction with us faster.
                            They may be used for the purposes of managing your preferences, maintaining and optimizing security, marketing, communication, analytics, and research.
                            We primarily use the types of cookies below:
                        </p>
                        <ul className="cookie-list">
                            <li>
                                <strong>Essential Cookies or Strictly Necessary Cookies:</strong> These cookies are essential to the functioning of our Website and for you to move around the Website.
                                Without these cookies, certain features cannot function. No information about your browsing habits is gathered by these cookies.
                            </li>
                            <li>
                                <strong>Functional Cookies:</strong> These cookies remember how you prefer to use our Website and improve the way our Website works.
                                These remain on your computer/device for a pre-defined period of time.
                            </li>
                            <li>
                                <strong>Performance Cookies:</strong> Some cookies help us with the performance and design of our Website.
                                For example, these cookies show us statistics, which are the most frequently visited pages on the Website, help us record any difficulties you have with the Website, and whether our publicity is effective or not.
                            </li>
                            <li>
                                <strong>Targeting or Tracking Cookies:</strong> On certain pages of our Website, we use cookies to help us understand your interests as you browse the Website, so we can tailor and deliver to you a more personalized service in the future.
                                This assists us in delivering relevant, interest-based information to you.
                            </li>
                        </ul>
                        <p>
                            At any time, you also have the option to change/control your cookies through your browser settings.
                            However, if you do turn off cookies in your browser, you will not be able to fully experience some of the features our Website.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Use of our Website by Children</h2>
                        <p>
                            Pharma Empower does not knowingly collect or use any personal information from children (we define “children” as those who are younger than 18 years of age) on this Website.
                            We do not knowingly allow children to communicate with us or use any of our online services.
                            If you are a parent or guardian and become aware that your child has provided us with information, please contact us and we will work with you to address this issue.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Right to Your Personal Information on Our Website</h2>
                        <ul className="rights-list">
                            <li><strong>Right to access:</strong> You have the right to ask for a copy of your personal data and to verify how we are processing it.</li>
                            <li><strong>Right to rectification:</strong> If you believe we have inaccurate or incomplete information about you, you have the right to ask us to correct or update it.</li>
                            <li><strong>Right to be forgotten:</strong> In certain circumstances, you have the right to ask us to remove or erase your personal data from our records.</li>
                            <li><strong>Right to object:</strong> You have the right to object to processing of your personal data. You also have the right not to be subjected to any automated decision making or profiling.</li>
                            <li><strong>Right to restriction of processing:</strong> You have the right to ask us to restrict processing of your personal data in cases where the data is inaccurate, or the processing of the data is unlawful. This does not restrict Pharma Empower from processing of your personal data for legal and regulatory requirements.</li>
                            <li><strong>Right to withdraw consent:</strong> If we process your personal data based on your consent, you can withdraw your consent at any point of time.</li>
                            <li><strong>Right to portability:</strong> You have the right to ask us to transfer your data to you, or any other third party.</li>
                        </ul>
                        <p>
                            If you would like to opt out of future communications from an Pharma Empower business or an Pharma Empower program, a request can be sent to an address found at the “Contact Us” web page.
                            In all communications to Pharma Empower, please include the e–mail address used for registration (if applicable), the Website address and explanation of your request.
                            If you would like to delete or amend your personal information and are contacting us by email, please put “Deletion Request” or “Amendment Request”, as applicable, in the subject line of the email.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Complaints and Grievances</h2>
                        <p>
                            Any complaints or concerns with regard to the processing of personal data provided by you or breach of these terms must be reported to <strong>legal@Pharma Empower.com</strong> (Note: Please confirm actual email or domain).
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Change in Policy</h2>
                        <p>
                            Pharma Empower reserves the right to amend this Privacy Policy without prior notice to reflect technological advancements, legal and regulatory changes and good business practices.
                            If Pharma Empower changes its privacy practices, a new Privacy Policy will reflect those changes and the effective date of the revised Privacy Policy will be set forth in this section.
                        </p>
                        <p className="privacy-date">
                            Last updated: January 26, 2026
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
