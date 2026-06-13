import { useState, useEffect, useRef } from "react";

// ── QUESTIONS ────────────────────────────────────────────────────────────────

const CON_LAW_QUESTIONS = [
  { id: 1, category: "Constitutional Law", question: "A police officer employed for ten years refused a prescribed blood transfusion due to sincere religious beliefs after being shot on duty, and died. The city denied the death benefit under an amendment that denied benefits when death was caused by refusal of reasonably available medical care. Is the amendment constitutional as applied?", answers: ["(A) No, because it effectively discriminates against a religious practice.", "(B) No, because it violates the vested contractual rights of city employees hired before the amendment.", "(C) Yes, because it does not single out religious reasons for denial of benefits and is a reasonable limitation.", "(D) Yes, because it imposes a condition only on a government benefit and does not penalize individual conduct."], correct: "C" },
  { id: 2, category: "Constitutional Law", question: "The United States sued a state in federal court for injunctive relief, arguing the state's federally-funded child welfare programs failed to comply with federal standards. The state has moved to dismiss. Is the court likely to dismiss the action?", answers: ["(A) No, because Congress can place any condition on the receipt of federal funds.", "(B) No, because the Eleventh Amendment does not bar actions brought by the United States.", "(C) Yes, because the Eleventh Amendment bars actions against a state in federal court.", "(D) Yes, because the protection of child welfare is reserved to the states."], correct: "B" },
  { id: 3, category: "Constitutional Law", question: "A store owner was prosecuted under a state anti-obscenity law for selling a video consisting entirely of pictures of nude sunbathers on a foreign beach where nude sunbathing is common. The store owner defended on First Amendment grounds. Should the store owner prevail?", answers: ["(A) No, because the store owner is engaged in commercial sale not protected by the First and Fourteenth Amendments.", "(B) No, because the video appeals to the prurient interest of viewers and lacks serious social value.", "(C) Yes, because mere portrayals of nudity are insufficient to justify a finding that the video is obscene.", "(D) Yes, because the state lacks a compelling interest in applying its anti-obscenity law to conduct occurring outside the United States."], correct: "C" },
  { id: 4, category: "Constitutional Law", question: "A state supreme court invalidated a state law protecting rape victim names solely on state constitutional grounds, noting the federal First Amendment 'very likely' also bars it but declining to decide that issue. The victim petitioned the U.S. Supreme Court for review. Is the U.S. Supreme Court likely to review the judgment?", answers: ["(A) No, because the First Amendment prohibits the imposition of liability for the publication of truthful information.", "(B) No, because the judgment rests upon an adequate and independent state-law ground.", "(C) Yes, because the supremacy clause does not permit a state to create rights greater than those in the federal Constitution.", "(D) Yes, because the U.S. Supreme Court's appellate jurisdiction extends to cases arising under federal law."], correct: "B" },
  { id: 5, category: "Constitutional Law", question: "A federal statute prohibits all commercial advertising of red meat products based on studies linking red meat to cancer, but does not restrict sales. Red meat producers challenge the statute as a First Amendment violation. Is the court likely to find the statute constitutional?", answers: ["(A) No, because it does not serve a substantial government interest.", "(B) No, because it is more extensive than necessary to serve the government interest in preventing certain cancers.", "(C) Yes, because it does not affect speech protected by the First Amendment.", "(D) Yes, because it serves a legitimate government interest in protecting public health."], correct: "B" },
  { id: 6, category: "Constitutional Law", question: "A federal statute authorizes an agency to issue rules requiring state legislatures to adopt laws of limited duration to reduce water pollution from gasoline-powered boat motors. Several states challenged the rules as unconstitutional. Should the court uphold the rules?", answers: ["(A) No, because the federal government may not compel a state legislature to enact a federally mandated regulatory program.", "(B) No, because the Tenth Amendment grants states immunity from all direct federal regulation.", "(C) Yes, because the rules serve an important purpose and requirements are only temporary.", "(D) Yes, because the supremacy clause of Article VI requires states to enforce federal law."], correct: "A" },
  { id: 7, category: "Constitutional Law", question: "A state law prohibits use of state medical funding for surgery for any person who has resided in the state for less than one year, except in emergencies. A woman who moved to the state two months ago needs non-emergency surgery. Should the woman prevail in a suit to invalidate the law?", answers: ["(A) No, because the law reasonably conserves the state's limited resources.", "(B) No, because the law reasonably prevents expenditure of state funds on transient nonresidents.", "(C) Yes, because the law burdens the woman's fundamental right to health care.", "(D) Yes, because the law burdens the woman's fundamental right to travel."], correct: "D" },
  { id: 8, category: "Constitutional Law", question: "Due to a heating fuel shortage, the President ordered federal executive agencies to be open only four days per week. Congress had assumed five days when appropriating funds but did not require it by statute. Is the President's order constitutional?", answers: ["(A) No, because the heads of the various executive agencies have final responsibility for the operation of those agencies.", "(B) No, because members of Congress assumed those agencies' offices would be open five days per week when they passed the appropriations statute.", "(C) Yes, because the Constitution vests the President with plenary authority to direct the administration of all federal agencies in any manner the President deems expedient.", "(D) Yes, because the order relates to the management of the executive branch and is not prohibited by any statute."], correct: "D" },
  { id: 9, category: "Constitutional Law", question: "A state law prohibits publishing details of executions. After a botched execution, a newspaper published a detailed account written by its reporter who was permitted to observe but made no promise to report only the warden's official statement. Is the prosecution of the newspaper constitutional?", answers: ["(A) No, because the prosecution seeks to punish the publication of lawfully obtained, truthful information about a matter of public significance, without adequate justification.", "(B) No, because the reporter did not promise prison officials that he would report only the warden's official statement.", "(C) Yes, because publication of the details of such events might cause psychological damage to some children.", "(D) Yes, because the newspaper should have brought an action to test the validity of the law before publishing."], correct: "A" },
  { id: 10, category: "Constitutional Law", question: "A state-owned electric power system refused to supply power to out-of-state purchasers residing in states that would not accept spent nuclear fuel for disposal. No federal statute applies. What is the strongest argument that the state's action is constitutional?", answers: ["(A) A state may condition the sale of its products to out-of-state purchasers on the willingness of those purchasers to bear the fair share of environmental costs.", "(B) The generation of electricity is intrastate by nature and therefore subject to plenary state control.", "(C) The state itself owns and operates the power system, and therefore its refusal is not subject to the negative implications of the commerce clause.", "(D) The state's action is rationally related to the health, safety, and welfare of state citizens."], correct: "C" },
  { id: 11, category: "Constitutional Law", question: "A city enacted an ordinance requiring all rental housing units to provide at least one full bathroom per bedroom, washer/dryer hookups, and covered parking. A plaintiff who owns low-income rental housing has sued, claiming the ordinance is unconstitutional on its face. What is the burden of persuasion?", answers: ["(A) The city must demonstrate the ordinance is necessary to serve a compelling state interest because it adversely affects the fundamental right to use property efficiently.", "(B) The city must demonstrate the ordinance is necessary to serve a compelling state interest because it will have a substantial and disproportionate negative impact on low-income persons.", "(C) The plaintiff must demonstrate the ordinance is not substantially related to an important state interest.", "(D) The plaintiff must demonstrate there is no rational relationship between the ordinance and any legitimate state interest, because the ordinance regulates economic activity normally presumed within state regulatory authority."], correct: "D" },
  { id: 12, category: "Constitutional Law", question: "A plaintiff sued a defendant in a state court alleging only a cause of action arising under a federal statute, though state law provides a similar cause of action. The federal statute says claims can be brought in any court of competent jurisdiction. Should the state court hear the case?", answers: ["(A) No, because cases arising under federal law must be decided in federal court.", "(B) No, because state courts must abstain in cases arising under federal law until a federal court has decided the federal issue.", "(C) Yes, because state courts may not discriminate against cases arising under federal law.", "(D) Yes, because the parties cannot proceed in federal court since there is no diversity of citizenship."], correct: "C" },
  { id: 13, category: "Constitutional Law", question: "An airline falsely claimed in an ad that its competitor had an inferior safety record, based on erroneous information it assumed to be true. The airline was charged under a state law penalizing false or misleading public statements about a service or product. No federal statute applies. Which argument best supports the airline's First Amendment defense?", answers: ["(A) Its statement about the safety record was made without malice.", "(B) Its statement about the safety record was protected noncommercial speech.", "(C) The state law is a prior restraint.", "(D) The state law is overbroad."], correct: "D" },
  { id: 14, category: "Constitutional Law", question: "A U.S. senator made a false speech on the floor of the Senate accusing a low-level federal purchasing officer of wasting taxpayer money. The officer sued the senator for defamation, alleging the accusation was false and the senator was negligent. What is the most appropriate ground for the court to dismiss the complaint?", answers: ["(A) The federal government is constitutionally immune from suit without its consent, and it has not consented to suits of this kind.", "(B) The First Amendment guarantees members of Congress an unqualified right to speak on matters of public concern at any place and time.", "(C) The First Amendment protects public officials from defamation liability for statements made in their official capacity unless the plaintiff proves actual malice.", "(D) The speech and debate clause of Article I, Section 6 wholly insulates members of Congress from tort liability for statements made on the floor of Congress."], correct: "D" },
  { id: 15, category: "Constitutional Law", question: "A privately owned mall broke up a peaceful protest near a department store entrance and required the protesters to leave. The protesters claimed their First and Fourteenth Amendment rights to freedom of speech were violated. Should the protesters prevail?", answers: ["(A) No, because the mall is private property, and there was no state action to which the freedom of speech guarantees of the First and Fourteenth Amendments apply.", "(B) No, because the prohibition of protests adjacent to the entrance of a department store during shopping hours is a constitutionally proper time, place, and manner limitation.", "(C) Yes, because the mall is functionally equivalent to a town and its actions are subject to the Constitution's guarantees of freedom of speech and assembly.", "(D) Yes, because the mall's restriction on the protesters' speech was broader than necessary to ensure proper access to the department store."], correct: "A" },
  { id: 16, category: "Constitutional Law", question: "A state law provides that a person who has been divorced may not marry again unless he or she is current on all child-support payments. A woman who was refused a marriage license under this law sued the appropriate state officials. What standard should the court apply in reviewing the constitutionality of this law?", answers: ["(A) The state must show that the law is necessary to serve a compelling government interest.", "(B) The state must show that the law is substantially related to an important government interest.", "(C) The woman must show that the law serves no important public purpose.", "(D) The woman must show that the legislature did not have a rational basis for enacting the law."], correct: "A" },
  { id: 17, category: "Constitutional Law", question: "Congress enacted a statute prohibiting discrimination in the rental of residential property anywhere in the United States on the basis of sexual orientation or preference by any person or entity, public or private. Which provision provides the strongest basis for Congress's authority to enact this statute?", answers: ["(A) The Enforcement Clause of the Fourteenth Amendment.", "(B) The Privileges and Immunities Clause of Article IV.", "(C) The Commerce Clause of Article I, Section 8.", "(D) The General Welfare Clause of Article I, Section 8."], correct: "C" },
  { id: 18, category: "Constitutional Law", question: "A school principal was prosecuted under a new state law for enrolling and providing education to foreign nationals he knew to be in the country illegally, for acts that took place before the law was adopted. No federal statute applied. What constitutional provision would most help the principal's defense?", answers: ["(A) The Due Process Clause of the Fourteenth Amendment.", "(B) The Equal Protection Clause of the Fourteenth Amendment.", "(C) The Ex Post Facto Clause of Article I, Section 10.", "(D) The Privileges or Immunities Clause of the Fourteenth Amendment."], correct: "C" },
  { id: 19, category: "Constitutional Law", question: "A state law prohibited the distribution of 'seditious propaganda.' The state prosecuted U.S. Post Office letter carriers under this law for delivering propaganda from a foreign country. Which of the following statements is an INACCURATE description of the state's law as applied to the letter carriers?", answers: ["(A) It is an unconstitutional bill of attainder.", "(B) It is void for vagueness.", "(C) It may not be applied to the letter carriers, because they are employees of a federal instrumentality carrying out an authorized function.", "(D) It unconstitutionally abridges rights protected by the First and Fourteenth Amendments."], correct: "A" },
  { id: 20, category: "Constitutional Law", question: "A protester entered an IRS office, denounced the income tax, and set fire to pages from his own copy of the Internal Revenue Code. He was charged with violating a state law prohibiting igniting a fire in a public building. He claimed the prosecution was unconstitutional under the First Amendment. May the protester constitutionally be convicted?", answers: ["(A) No, because he was exercising his right to freedom of speech by burning a copy of the code.", "(B) No, because the copy of the code belonged to him, and thus burning it did not infringe upon a legitimate government interest.", "(C) Yes, because the burning of the code was conduct rather than speech.", "(D) Yes, because the state law is narrowly drawn to further a substantial government interest in prohibiting the noncommunicative aspects of the act in question."], correct: "D" },
  { id: 21, category: "Constitutional Law", question: "A private religiously-operated university, 25% state-funded, discharged a professor solely because she published a column arguing 'religion has become a negative force in society.' The professor sued claiming the discharge violated her constitutional right to freedom of speech. The university moved to dismiss, arguing the U.S. Constitution provides no cause of action. Should the court grant the motion to dismiss?", answers: ["(A) Yes, because the First and Fourteenth Amendments protect the right of the university to employ only individuals who share and communicate its views.", "(B) Yes, because the action of the university in discharging the professor is not attributable to the state for purposes of the Fourteenth Amendment.", "(C) No, because the accreditation and partial funding of the university by the state are sufficient to justify the conclusion that the state was an active participant in the discharge.", "(D) No, because the U.S. Constitution provides a cause of action against any state-accredited institution that restricts freedom of speech as a condition of employment."], correct: "B" },
  { id: 22, category: "Constitutional Law", question: "A federal statute requires the President to appoint ambassadors from a Senate-compiled list of three individuals, with Senate confirmation deemed automatic 30 days after the President names an appointee from the list unless the Senate determines otherwise within that period. Is this statute constitutional?", answers: ["(A) No, because the statute violates the constitutional requirements for appointment of principal officers of the United States.", "(B) No, because the statute impermissibly restricts the plenary foreign affairs powers of the President.", "(C) Yes, because the statute is consistent with the constitutional requirement that presidential appointment of ambassadors be with the advice and consent of the Senate.", "(D) Yes, because the statute is a necessary and proper measure in furtherance of Congress's power to regulate commerce with foreign states."], correct: "A" },
  { id: 23, category: "Constitutional Law", question: "Under a state law, a drug company is strictly liable for false factual claims about a prescription drug. A drug company claimed a drug was safe for children; medical studies at the time supported this claim, but later research proved the drug was harmful to children. The company moved to dismiss on First Amendment grounds. Should the court grant the motion?", answers: ["(A) No, because false or misleading commercial speech is not constitutionally protected.", "(B) No, because the drug business is subject to extensive health and safety regulation.", "(C) Yes, because liability cannot be imposed for false statements without a showing of actual malice.", "(D) Yes, because the company's claims about the drug were a matter of public concern."], correct: "A" },
  { id: 24, category: "Constitutional Law", question: "A state-owned natural gas field awarded a contract to a lower-bidding local company over an interstate pipeline company that bid higher. The local company's bid included a commitment to pass savings along to local customers. The interstate company sued. Should the interstate company prevail?", answers: ["(A) No, because the state has a compelling interest in reducing the cost of gas for state citizens.", "(B) No, because the state acted as a market participant.", "(C) Yes, because the state acted irrationally by not choosing the highest bidder and thus denied the interstate company due process of law.", "(D) Yes, because the state discriminated against interstate commerce."], correct: "B" },
  { id: 25, category: "Constitutional Law", question: "A state enacted a law requiring all children of elementary and secondary school age to attend schools operated by their local public school districts. Parents of children enrolled in private schools filed suit to challenge the constitutionality of this state law. Should the court uphold the law?", answers: ["(A) Yes, because it is rationally related to a legitimate state interest.", "(B) Yes, because it is necessary to further a compelling state interest.", "(C) No, because it is not rationally related to a legitimate state interest.", "(D) No, because it is not necessary to further a compelling state interest."], correct: "D" },
  { id: 26, category: "Constitutional Law", question: "Congress enacted a statute establishing a biological diversity protection program. An inseverable provision provides that the agency must report each designation to a committee of Congress, and that the committee may overturn the agency's designation by majority vote. Why is the statute unconstitutional?", answers: ["(A) It constitutes an invalid delegation of legislative authority to an executive agency.", "(B) It interferes with the exercise of the President's paramount authority in foreign affairs.", "(C) It requires an executive agency to report its decisions to Congress.", "(D) It authorizes a committee of Congress to overturn an executive decision."], correct: "D" },
  { id: 27, category: "Constitutional Law", question: "A city ordinance prohibited picketing in residential neighborhoods unless the picketing related to neighborhood zoning requirements. A group wanted to picket in front of a business owner's home because of the business owner's employment practices. Will the group's First Amendment challenge likely prevail?", answers: ["(A) No, because the ordinance is a content-neutral regulation of speech.", "(B) No, because the ordinance regulates conduct rather than speech.", "(C) Yes, because the ordinance irrationally discriminates between different types of protesters.", "(D) Yes, because the ordinance is a content-based regulation of speech."], correct: "D" },
  { id: 28, category: "Constitutional Law", question: "A state law prohibits withdrawal of groundwater for use in another state. A federal statute provides that transport of groundwater may be restricted 'in accordance with the laws of the state in which the water originates.' An association of out-of-state water users sued, claiming the law violates the negative implications of the Commerce Clause. What is the best argument supporting a motion to dismiss?", answers: ["(A) The law promotes a compelling state interest that outweighs any burden on interstate commercial activity.", "(B) Groundwater within a state is not itself an article of interstate commerce, and state regulation of its withdrawal does not implicate the Commerce Clause.", "(C) The Tenth Amendment reserves to the states plenary authority over natural resources within their borders.", "(D) The federal statute explicitly consents to a state's regulation of its groundwater in a way that would otherwise violate the negative implications of the Commerce Clause."], correct: "D" },
  { id: 29, category: "Constitutional Law", question: "Congress passed a statute providing that parties could no longer seek review in the U.S. Supreme Court of final judgments in criminal matters made by the highest court in each state. What is the best argument supporting the constitutionality of the statute?", answers: ["(A) Congress has the power to make exceptions to the appellate jurisdiction of the Supreme Court.", "(B) Criminal matters are traditionally governed by state law.", "(C) The proper means of federal judicial review of state criminal matters is by habeas corpus.", "(D) The review of state court judgments is not within the original jurisdiction of the Supreme Court."], correct: "A" },
  { id: 30, category: "Constitutional Law", question: "A state denied bar admission to an applicant who refused to answer a question on the bar application asking whether the applicant was or had previously been a member of any subversive organization. The applicant challenged this as a violation of freedom of association. Is the applicant likely to prevail?", answers: ["(A) No, because membership in a subversive group constitutes endorsement of the group's illegal activities.", "(B) No, because the Constitution does not apply to the bar.", "(C) Yes, because denying bar admission based on any association with a subversive organization violates the First Amendment.", "(D) Yes, because denying bar admission based solely on past membership in a subversive organization violates the First Amendment."], correct: "D" },
  { id: 31, category: "Constitutional Law", question: "A state statute prohibits publicly displaying or selling to any person material 'that may be harmful to minors because of the violent or sexually explicit nature of its pictorial content.' A store owner is prosecuted for displaying and selling such magazines. What is the best defense?", answers: ["(A) First Amendment as incorporated into the Fourteenth Amendment, because the statute is excessively vague and overbroad.", "(B) First Amendment as incorporated into the Fourteenth Amendment, because a state may not prohibit the sale of violent or sexually explicit material without proof that the material is utterly without any redeeming value.", "(C) Equal Protection of the Laws Clause, because the statute irrationally treats violent and sexually explicit material that is pictorial differently from such material that is composed wholly of printed words.", "(D) Equal Protection of the Laws Clause, because the statute irrationally distinguishes between violent and sexually explicit pictorial material that may harm minors and such material that may harm only adults."], correct: "A" },
  { id: 32, category: "Constitutional Law", question: "A state passed a Coyote Bounty Bill offering $25 for each coyote killed within the state. A hunter shot coyotes in a National Forest without permission from the Bureau of Land Management and collected the bounty. The hunter was convicted under the National Ecological Balance Act and appealed. On appeal, the court of appeals should hold the National Ecological Balance Act, as applied to the hunter, to be:", answers: ["(A) Constitutional, because the Property Clause of Article IV, Section 3 authorizes such federal statutory controls and sanctions.", "(B) Constitutional, because Article I, Section 8 authorizes Congress to enact all laws necessary and proper to advance the general welfare.", "(C) Unconstitutional, because Congress may not use its delegated powers to override the Tenth Amendment right of the state to legislate in areas of traditional state governmental functions.", "(D) Unconstitutional, because Congress violates the Full Faith and Credit Clause of Article IV when it punishes conduct authorized by state action."], correct: "A" },
  { id: 33, category: "Constitutional Law", question: "A purchaser bought land in mountain foothills to build a housing development. The county then prohibited all construction in the area to 'conserve for future generations the unique natural wildlife and plant habitats.' The purchaser cannot sell or lease the property at any price, and realtors have advised the property is now worthless. The purchaser sued the county for just compensation. Is the court likely to rule in favor of the purchaser?", answers: ["(A) No, because the county did not take title to the property from the purchaser.", "(B) No, because the regulation has not caused or authorized any uninvited physical invasion or intrusion onto the property.", "(C) Yes, because the conservation objective of the county ordinance is not sufficiently compelling to justify the substantial diminution in the property value.", "(D) Yes, because the effect of the county's regulation is to deny the purchaser's investment-backed expectation and essentially all economically beneficial use of the property."], correct: "D" },
  { id: 34, category: "Constitutional Law", question: "Congress enacted a statute imposing severe criminal penalties on stock market traders who take 'unfair advantage' of other investors. The statute does not define 'unfair advantage.' An association of law professors who do not trade in stocks sued to enjoin enforcement of the statute as unconstitutionally vague. May the federal court determine the merits of this suit?", answers: ["(A) Yes, because the suit involves a dispute over the constitutionality of a federal statute.", "(B) Yes, because the plaintiffs seek real relief of a conclusive nature — an injunction against enforcement of this statute.", "(C) No, because the plaintiffs do not have an interest in the invalidation of this statute that is adequate to ensure that the suit presents an Article III controversy.", "(D) No, because a suit for an injunction against enforcement of a criminal statute may not be brought in federal court at any time prior to a bona fide effort to enforce that statute."], correct: "C" },
  { id: 35, category: "Constitutional Law", question: "Congress enacted a $100 tax on each ton of a mineral mined in the United States — a mineral currently mined only in one state that is added to fresh water to prevent freshwater parasites. The mineral producers challenged the tax on constitutional grounds. Is this tax constitutional?", answers: ["(A) No, because producers in only one state will pay the tax, so it is not uniform among the states and denies equal protection.", "(B) No, because it is likely to have an adverse effect on the freshwater commercial fishing industry and Congress has a responsibility under the Commerce Clause to protect such industries.", "(C) Yes, because the tax is a necessary and proper means of exercising federal authority over the navigable waters of the United States.", "(D) Yes, because the power of Congress to impose taxes is plenary, this tax contains no provisions extraneous to tax needs or purposes, and it is not barred by any prohibitory language in the Constitution."], correct: "D" },
  { id: 36, category: "Constitutional Law", question: "The U.S. government demonstrated that terrorist attacks involving commercial airliners were perpetrated exclusively by individuals of one particular race. Congress enacted a statute imposing stringent new airport and airline security measures only on individuals of that race. Which of the following provides the best ground for challenging the constitutionality of the statute?", answers: ["(A) The Commerce Clause of Article I, Section 8.", "(B) The Due Process Clause of the Fifth Amendment.", "(C) The Privileges and Immunities Clause of Article IV.", "(D) The Privileges or Immunities Clause of the Fourteenth Amendment."], correct: "B" },
  { id: 37, category: "Constitutional Law", question: "A state law forbids aliens from owning more than 100 acres of land within the state. A resident alien purchased 200 acres after the law's passage and brought a federal court action to enjoin enforcement. The defendant moves to dismiss. The federal court should:", answers: ["(A) Dismiss the action, because under the Constitution aliens may not sue in federal court.", "(B) Dismiss the action, because a state has unlimited power to determine the qualifications for landholding within its boundaries.", "(C) Hear the action, because the United Nations Charter forbids such discrimination.", "(D) Hear the action, because a federal question is presented."], correct: "D" },
  { id: 38, category: "Constitutional Law", question: "In a state employee sexual harassment grievance proceeding, the state's attorney used all five strikes to eliminate five of the six female arbitrators, stating she believed women as a group would be biased in favor of another woman claiming harassment. The resulting all-male panel ruled against the employee. The employee challenged the panel selection process as a gender-based denial of equal protection. In this case, the court should hold that the panel selection process is:", answers: ["(A) Unconstitutional, because the gender classification used by the state's attorney does not satisfy the requirements of intermediate scrutiny.", "(B) Unconstitutional, because the gender classification denies the grievant the right to a jury made up of her peers.", "(C) Constitutional, because the gender classification satisfies the requirements of the strict scrutiny test.", "(D) Constitutional, because the gender classification satisfies the requirements of the rational basis test."], correct: "A" },
  { id: 39, category: "Constitutional Law", question: "A city ordinance imposes a license tax on computer assemblers as a percentage of gross receipts, but reduces the tax by a percentage equal to the proportion of components manufactured in-state. A company whose components all come from outside the state pays the full tax, while competitors using in-state components pay less. The company challenges the tax under the negative implications of the Commerce Clause. The court should rule:", answers: ["(A) Against the company, because the tax falls only on companies resident in the city and does not discriminate against interstate commerce.", "(B) Against the company, because the Commerce Clause does not interfere with the right of a state to foster and support businesses located within its borders.", "(C) For the company, because any tax on a company engaged in interstate commerce, measured in whole or in part by its gross receipts, is a per se violation of the negative implications of the Commerce Clause.", "(D) For the company, because the tax improperly discriminates against interstate commerce by treating in-state products more favorably than out-of-state products."], correct: "D" },
  { id: 40, category: "Constitutional Law", question: "A federal statute required a federal agency to establish minimum quality standards for all beer sold in the United States. No standards have yet been adopted. A brewery that produces unpasteurized beer sued to enjoin the agency from adopting any standards that would prohibit the sale of unpasteurized beer. How should the district court dispose of the suit?", answers: ["(A) Determine whether the agency could reasonably believe that pasteurization is the safest process, and if so, refuse to issue the injunction.", "(B) Determine whether the process used by the brewery is as safe as pasteurization and, if it is, issue the injunction against the agency.", "(C) Refuse to adjudicate the merits of the suit at this time and stay the action until the agency has actually issued beer quality standards.", "(D) Refuse to adjudicate the merits of the suit, because it does not involve a justiciable case or controversy."], correct: "D" },
  { id: 41, category: "Constitutional Law", question: "A city ordinance allows cemetery lot owners to erect a memorial monument or marker of their choice on their lot, subject to size restrictions. The city maintains the cemetery using lot sale revenues, supplemented by a small amount of city tax funds. City taxpayers challenged the ordinance insofar as it permits the erection of religious memorial monuments on lots in the city-operated cemetery. Is this suit likely to be successful?", answers: ["(A) No, because only a small amount of city tax funds has been used to maintain the cemetery.", "(B) No, because the purpose of the ordinance is entirely secular, its primary effect neither advances nor inhibits religion, and it does not foster excessive government entanglement with religion.", "(C) Yes, because city maintenance of any religious object is a violation of the Establishment Clause.", "(D) Yes, because no compelling governmental interest justifies authorizing private persons to erect religious monuments in a city-operated cemetery."], correct: "B" },
  { id: 42, category: "Constitutional Law", question: "The governor of a state proposes to place a Christmas nativity scene donated by private citizens in the state capitol rotunda, displayed annually from December 1–31, next to permanent displays depicting the state's manufactured products. If challenged on Establishment Clause grounds, the proposed nativity scene display would be held:", answers: ["(A) Unconstitutional, because the components of the nativity scene would be owned by the state rather than by private persons.", "(B) Unconstitutional, because the nativity scene would not be displayed in a context that appeared to depict and commemorate the Christmas season as a primarily secular holiday.", "(C) Constitutional, because the components of the nativity scene would be donated to the state by private citizens rather than purchased with state funds.", "(D) Constitutional, because the nativity scene would be displayed alongside an exhibit of various products manufactured in the state."], correct: "B" },
  { id: 43, category: "Constitutional Law", question: "A private organization that permits only males to serve in its highest offices rented a city-owned public auditorium for its national convention, inviting the general public to attend an officer installation ceremony. A plaintiff sued the organization seeking to enjoin its use of the auditorium for the installation, solely because the organization disqualifies women from its highest offices. Will the plaintiff prevail?", answers: ["(A) Yes, because the Fourteenth Amendment prohibits such an organization from discriminating against women in any of its activities to which it has invited members of the general public.", "(B) Yes, because the organization's use of the city auditorium subjects its conduct to the provisions of the Fourteenth Amendment.", "(C) No, because the freedom of association protected by the Fourteenth Amendment prohibits the city from interfering in any way with the organization's use of city facilities.", "(D) No, because this organization is not a state actor and, therefore, its activities are not subject to the provisions of the Fourteenth Amendment."], correct: "D" },
  { id: 44, category: "Constitutional Law", question: "A county ordinance states that only taxicabs registered in the county may pick up or discharge passengers in the county, and that only county residents may register taxicabs in the county. The stated purpose is to reduce traffic congestion. Taxicab owners from a neighboring state challenged the ordinance. What is the proper result?", answers: ["(A) Judgment for the taxicab owners, because private passenger automobiles contribute more to traffic congestion than taxicabs, indicating the ordinance is not a reasonable means to solve that problem.", "(B) Judgment for the taxicab owners, because the ordinance unduly burdens interstate commerce by insulating county taxicab owners from out-of-state competition without adequate justification.", "(C) Judgment for the county, because the ordinance forbids taxicabs registered in other counties as well as in other states, and therefore it does not discriminate against interstate commerce.", "(D) Judgment for the county, because taxicab owners do not constitute a suspect class and the ordinance is reasonably related to the legitimate governmental purpose of reducing traffic congestion."], correct: "B" },
  { id: 45, category: "Constitutional Law", question: "A city enacted an ordinance banning from its public sidewalks all machines dispensing publications consisting wholly of commercial advertisements, due to concerns about aesthetic effects of litter. The city continued to allow machines dispensing other types of publications. 30 of 300 sidewalk machines were removed. Is this ordinance constitutional?", answers: ["(A) Yes, because regulations of commercial speech are subject only to the requirement that they be rationally related to a legitimate state goal, and that requirement is satisfied here.", "(B) Yes, because the city has a compelling interest in protecting the aesthetics of its sidewalks and streets, and such a ban is necessary to vindicate this interest.", "(C) No, because it does not constitute the least restrictive means with which to protect the aesthetics of the city's sidewalks and streets.", "(D) No, because there is not a reasonable fit between the legitimate interest of the city in preserving the aesthetics of its sidewalks and streets and the means it chose to advance that interest."], correct: "D" },
  { id: 46, category: "Constitutional Law", question: "A barber's license was revoked based solely on affidavits by unnamed informants who claimed to have purchased cocaine from the barber in his barbershop, but who were not present or available for cross-examination. In a suit to have this revocation set aside, the barber's best constitutional argument is that:", answers: ["(A) The barber's inability to cross-examine his accusers denied him a fair hearing and caused him to be deprived of his barber license without due process of law.", "(B) The administrative license revocation proceeding was invalid, because it denied full faith and credit to the dismissal of the criminal charges by the U.S. attorney.", "(C) Article III requires a penalty of the kind imposed on him to be imposed by a court rather than an administrative agency.", "(D) The existence of federal laws penalizing the illegal sale of cocaine preempts state action relating to drug trafficking of the kind involved in this case."], correct: "A" },
  { id: 47, category: "Constitutional Law", question: "An attorney contracted for cable TV service solely to view a televised murder trial. When the judge banned cameras mid-trial as disruptive, the attorney sued for an injunction requiring the judge to resume televising, alleging deprivation of property without due process. The criminal trial ended in conviction before the attorney's case came to trial. The defendant moved to dismiss. The most proper disposition of this motion would be to:", answers: ["(A) Defer action on the motion until after any appellate proceedings in the suspect's case have concluded.", "(B) Defer action on the motion until after the state supreme court expresses a view on its proper disposition.", "(C) Grant the motion, because the subject matter of the controversy has ceased to exist and there is no strong likelihood that it will be revived.", "(D) Deny the motion, because the attorney has raised an important constitutional question about whether his investment in cable service is property protected by the Due Process Clause."], correct: "C" },
  { id: 48, category: "Constitutional Law", question: "A state imposes a tax on income that includes the fair rental value of any automobile provided by an employer for an employee's personal use. The federal government supplies automobiles to employees who may also use them personally. No federal legislation addresses this subject. May the state collect this tax on the fair rental value of the personal use of the automobiles furnished by the federal government to these employees?", answers: ["(A) No, because such a tax would be a tax on the United States.", "(B) No, because such a tax would be a tax upon activities performed on behalf of the United States, since the automobiles are primarily used by federal employees in the discharge of their official duties.", "(C) Yes, because the tax is imposed on the employees rather than on the United States, and the tax does not discriminate against persons who are employed by the United States.", "(D) Yes, because an exemption from such state taxes for federal employees would be a denial to others of the equal protection of the laws."], correct: "C" },
  { id: 49, category: "Constitutional Law", question: "A city taxicab operator's license ordinance provides that any citizen may file an objection to the issuance of a particular license, but only on the ground that an applicant does not possess the required qualifications. A licensed taxicab driver filed an objection solely on the ground that the grant of a license to a qualified applicant would impair the value of his existing license. City officials refused to hold a hearing. In this case, the court should rule for:", answers: ["(A) The taxicab driver, because the Due Process Clause of the Fourteenth Amendment requires all persons whose property may be adversely affected by governmental action to be given an opportunity for a hearing before such action occurs.", "(B) The taxicab driver, because the determination of whether to hold a hearing may not constitutionally be left to the discretion of the same officials whose action is being challenged.", "(C) The city officials, because the taxicab driver had the benefit of the licensing ordinance and, therefore, may not now question actions taken under it.", "(D) The city officials, because the licensing ordinance does not give the taxicab driver any property interest in being free of competition from additional licensees."], correct: "D" },
  { id: 50, category: "Constitutional Law", question: "Congress enacted a statute requiring each state legislature to enact a state law making it a state crime for any person to possess, use, or distribute, within 1,000 feet of any elementary or secondary school, any controlled substance that has previously been transported in interstate commerce and is not possessed pursuant to a proper physician's prescription. This federal statute is:", answers: ["(A) Unconstitutional, because Congress has no authority to require a state legislature to enact any specified legislation.", "(B) Unconstitutional, because the possession, use, or distribution in close proximity to a school of a controlled substance that has previously been transported in interstate commerce does not have a sufficiently close nexus to such commerce to justify its regulation by Congress.", "(C) Constitutional, because it contains a jurisdictional provision that will ensure, on a case-by-case basis, that any particular controlled substance subject to the terms of this statute will affect interstate commerce.", "(D) Constitutional, because Congress possesses broad authority under both the General Welfare Clause and the Commerce Clause to regulate any activities affecting education that also have, in inseverable aggregates, a substantial effect on interstate commerce."], correct: "A" },
  { id: 51, category: "Constitutional Law", question: "The President proposes to appoint a Presidential Advisory Commission on Vaccination to conduct a national publicity campaign to encourage vaccination. No federal statute authorizes or prohibits this action. The Commission's activities would be financed from funds appropriated by Congress to the office of the president for 'such other purposes as the President may think appropriate.' May the President constitutionally create such a commission?", answers: ["(A) Yes, because the President has plenary authority to provide for the health, safety, and welfare of the people of the United States.", "(B) Yes, because this action is within the scope of executive authority vested in the President by the Constitution, and no federal statute prohibits it.", "(C) No, because the protection of children against common diseases by vaccination is a traditional state function and therefore reserved to the states by the Tenth Amendment.", "(D) No, because Congress has not specifically authorized the creation and support of such a new federal agency."], correct: "B" },
  { id: 52, category: "Constitutional Law", question: "A proposed federal statute would prohibit all types of discrimination against black persons on the basis of their race in every business transaction executed anywhere in the United States by any person or entity, governmental or private. Is this proposed federal statute likely to be constitutional?", answers: ["(A) Yes, because it could reasonably be viewed as an exercise of Congress's authority to enact laws for the general welfare.", "(B) Yes, because it could reasonably be viewed as a means of enforcing the provisions of the Thirteenth Amendment.", "(C) No, because it would regulate purely local transactions that are not in interstate commerce.", "(D) No, because it would invade the powers reserved to the states by the Tenth Amendment."], correct: "B" },
  { id: 53, category: "Constitutional Law", question: "An independent municipal water-supply district adopted a rule unqualifiedly setting aside 25 percent of all staff positions and 25 percent of all contracts to members of racial minority groups, to help redress historical discrimination and help them achieve economic parity. No federal statute applies. The set-asides are:", answers: ["(A) Unconstitutional, because they would deny other potential employees or potential contractors the equal protection of the laws.", "(B) Unconstitutional, because they would impermissibly impair the right to contract of other potential employees or potential contractors.", "(C) Constitutional, because they would assure members of racial minority groups the equal protection of the laws.", "(D) Constitutional, because the function and activities of the water district are of a proprietary nature rather than a governmental nature and therefore not subject to the usual requirements of the Fourteenth Amendment."], correct: "A" },
  { id: 54, category: "Constitutional Law", question: "A state statute permits a woman to have an abortion on demand during the first trimester of pregnancy but prohibits abortion after that time unless her physician determines it is necessary to protect the woman's life or health. If challenged on constitutional grounds, this statute will probably be held:", answers: ["(A) Constitutional, because the state has made a rational policy choice that creates an equitable balance between the compelling state interest in protecting fetal life and the fundamental right of a woman to reproductive choice.", "(B) Constitutional, because recent rulings indicate that after the first trimester a fetus may be characterized as a person whose right to life is protected by the Due Process Clause.", "(C) Unconstitutional, because the state has, without adequate justification, placed an undue burden on the fundamental right of a woman to reproductive choice prior to fetal viability.", "(D) Unconstitutional, because a statute unqualifiedly permitting abortion at one stage of pregnancy and denying it at another with only minor exceptions establishes an arbitrary classification in violation of the Equal Protection Clause."], correct: "C" },
  { id: 55, category: "Constitutional Law", question: "Companies adversely affected by an EPA rule filed a petition for review in a court of appeals before the court decided the case, then sought immediate Supreme Court review via certiorari before the court of appeals ruled. The EPA asked the Supreme Court to dismiss the petition on jurisdictional grounds. The best constitutional argument in support of the EPA's request is that:", answers: ["(A) The case is not within the original jurisdiction of the Supreme Court as defined by Article III, and it is not a proper subject of that court's appellate jurisdiction because it has not yet been decided by any lower court.", "(B) The case is appellate in nature, but it is beyond the appellate jurisdiction of the Supreme Court, because Article III states that its jurisdiction extends only to cases arising under the Constitution.", "(C) Article III precludes federal courts from reviewing the validity of any federal agency rule in any proceeding other than an action to enforce the rule.", "(D) Article III provides that all federal cases, except those within the original jurisdiction of the Supreme Court, must be initiated by an action in a federal district court."], correct: "A" },
  { id: 56, category: "Constitutional Law", question: "A newly elected President recognized a rebel group as the government of a foreign country and ordered the ambassador from the previously recognized ruling faction to leave the United States within ten days. The ambassador filed an action in federal district court for a declaration that the ruling faction was the true government. The United States moved to dismiss. If the court dismisses the action, what will be the most likely reason?", answers: ["(A) The action involves a nonjusticiable political question.", "(B) The action is not ripe.", "(C) The action is within the original jurisdiction of the U.S. Supreme Court.", "(D) The ambassador does not have standing."], correct: "A" },
  { id: 57, category: "Constitutional Law", question: "A state statute requires an autopsy by the county coroner in all cases of death that are not obviously of natural causes. A man's parents, whose religion requires burial without invasive procedures, sought to enjoin an autopsy after the man died of mysterious causes. They claimed only that the application of this statute would violate their right to free exercise of religion. Assume that no federal statutes apply. The court should rule that the state's autopsy statute is:", answers: ["(A) Constitutional, because a dead individual is not a person protected by the Due Process Clause of the Fourteenth Amendment.", "(B) Constitutional, because it is a generally applicable statute and is rationally related to a legitimate state purpose.", "(C) Unconstitutional, because it is not necessary to vindicate a compelling state interest.", "(D) Unconstitutional, because it is not substantially related to an important state interest."], correct: "B" },
  { id: 58, category: "Constitutional Law", question: "A federal statute appropriated $7 million for a nationwide essay contest on 'How the United States Can Best Stop Drug Abuse.' The statute provides adequate criteria for selecting winners and states that judges are to be appointed by the president with the advice and consent of the Senate. A provision authorizes any taxpayer to challenge its constitutionality. In a suit by a federal taxpayer, the court should:", answers: ["(A) Refuse to decide its merits, because the suit involves policy questions that are inherently political and therefore nonjusticiable.", "(B) Hold the statute unconstitutional, because it does not provide sufficient guidelines for awarding the prize money and therefore unconstitutionally delegates legislative power.", "(C) Hold the statute unconstitutional, because its relationship to legitimate purposes of the spending power of Congress is too tenuous and conjectural.", "(D) Hold the statute constitutional, because it is reasonably related to the general welfare, it states concrete objectives, and it provides adequate criteria for conducting the essay contest and awarding the prize money."], correct: "D" },
  { id: 59, category: "Constitutional Law", question: "A senator made a speech on the floor of the U.S. Senate falsely accusing a federal civil servant of fraud, based on careless research by her legislative assistant. No legislation affecting the civil servant's agency was pending. The civil servant sued both the senator and her legislative assistant for defamation. As a matter of constitutional law, the court should:", answers: ["(A) Grant it as to the legislative assistant; deny it as to the senator because as an officer of the United States she has no freedom of speech rights in that capacity.", "(B) Grant it as to both defendants, because the senator is immune to suit for any speech she makes in the Senate under the Speech or Debate Clause, and the legislative assistant may assert the senator's immunity for his assistance in preparing the speech.", "(C) Deny it as to both defendants, because any immunity of the senator under the Speech or Debate Clause does not attach to a speech not germane to pending legislative business, and the legislative assistant is entitled to no greater immunity than the legislator he was assisting.", "(D) Deny it as to the legislative assistant; grant it as to the senator because she is immune from suit for her speech by virtue of the Speech or Debate Clause."], correct: "B" },
  { id: 60, category: "Constitutional Law", question: "A city zoning board denied an individual's application for a special use permit to operate a group home for convicts in transition from prison to parole, even though the proposed group home met all requirements, solely because of the nature of the proposed use. The individual sued seeking declaratory and injunctive relief on constitutional grounds. Which of the following best states the appropriate burden of persuasion in this action?", answers: ["(A) Because housing is a fundamental right, the zoning board must demonstrate that denial of the permit is necessary to serve a compelling state interest.", "(B) Because the zoning board's action has the effect of discriminating against a quasi-suspect class in regard to a basic subsistence right, the zoning board must demonstrate that the denial of the permit is substantially related to an important state interest.", "(C) Because the zoning board's action invidiously discriminates against a suspect class, the zoning board must demonstrate that denial of the permit is necessary to serve a compelling state interest.", "(D) Because the zoning board's action is in the nature of an economic or social welfare regulation, the individual seeking the permit must demonstrate that the denial of the permit is not rationally related to a legitimate state interest."], correct: "D" },
  { id: 61, category: "Constitutional Law", question: "After extensive hearings, Congress concluded that the sale of look-alike drugs was widespread and was creating severe health and law enforcement problems. To combat these problems, Congress enacted a comprehensive statute that regulates the manufacture, distribution, and sale of all nonprescription drugs in the United States. Which of the following sources of constitutional authority can most easily be used to justify the authority of Congress to enact this statute?", answers: ["(A) The spending power.", "(B) The Commerce Clause.", "(C) The general welfare clause.", "(D) The enforcement powers of the Fourteenth Amendment."], correct: "B" },
  { id: 62, category: "Constitutional Law", question: "Congress created a program making federal loans available to family farmers who had been unable to obtain loans from private lenders. Congress gave a designated federal agency discretion to decide which applicants receive the loans. A family farmer's application was summarily denied without a hearing. The farmer sued claiming this violated the due process clause of the Fifth Amendment. Should the court uphold the agency's decision?", answers: ["(A) No, because due process requires federal agencies to provide a hearing before making any factual determination that adversely affects an identified individual on the basis of his or her particular circumstances.", "(B) No, because the denial of a loan may deprive the farmer of an established liberty interest to pursue her chosen occupation.", "(C) Yes, because the applicable statute gives the farmer no legitimate claim of entitlement to receive a loan.", "(D) Yes, because the spending clause of Article I, Section 8 gives Congress plenary power to control the distribution of appropriated funds in any manner it wishes."], correct: "C" },
  { id: 63, category: "Constitutional Law", question: "A city passed an ordinance requiring individuals to obtain a license in order to care for children under the age of 12 for pay, requiring ten hours of instruction, a background check, and a $100 fee. The ordinance affected women disproportionately to men. Is the ordinance constitutional?", answers: ["(A) No, because it has a disparate impact on women without a showing that the ordinance is necessary to advance a compelling government interest.", "(B) No, because it infringes on the freedom of contract without a compelling government interest.", "(C) Yes, because any burden it imposes is clearly outweighed by an important government objective.", "(D) Yes, because it is rationally related to a legitimate government objective."], correct: "D" },
  { id: 64, category: "Constitutional Law", question: "A federal statute required that any individual or entity owning more than 100 cars had to ensure that at least 10 percent of those cars were electric powered. A city filed suit in federal district court against the federal official who enforced this requirement, seeking an injunction prohibiting enforcement of the statute on the ground that it was unconstitutional. Should the court grant the injunction?", answers: ["(A) No, because the statute is valid under the Commerce Clause and does not violate the Tenth Amendment.", "(B) No, because the federal government has sovereign immunity and cannot be sued without its explicit consent.", "(C) Yes, because the statute violates the reserved rights of the states under the Tenth Amendment.", "(D) Yes, because as applied to state and local governments, the statute exceeds Congress's power under the Commerce Clause."], correct: "A" },
];

const EVIDENCE_QUESTIONS = [
  { id: 1001, category: "Evidence", question: "A plaintiff, a management trainee, brought a sex discrimination lawsuit against her employer for wrongful termination. At trial, the plaintiff is prepared to testify that a janitor told her that he had heard her supervisor say to male coworkers about her, \"Make it hard for her. Maybe she'll go home where she belongs.\" Is the plaintiff's proposed testimony admissible?", answers: ["(A) No, because the janitor's statement is hearsay not within any exception.", "(B) No, because the statements of both the janitor and the supervisor are hearsay not within any exception.", "(C) Yes, because the janitor's statement is a present sense impression, and the supervisor's statement is a statement of his then-existing state of mind.", "(D) Yes, because the statements of both the janitor and the supervisor are statements concerning a matter within the scope of their employment."], correct: "A" },
  { id: 1002, category: "Evidence", question: "A plaintiff sued a defendant in federal court for assault and battery. The court allowed the plaintiff to introduce the deposition testimony of a witness, now deceased, that he was with the plaintiff at the time of the incident. The defendant seeks to impeach the testimony with the witness's 13-year-old conviction for burglary (18 months served) for breaking into a neighbor's home while she was away and taking valuable jewelry. Should the court allow evidence of the conviction?", answers: ["(A) No, because the witness did not testify at trial.", "(B) No, unless the court finds, in the interests of justice, that the probative value of the conviction, supported by specific facts and circumstances, substantially outweighs its prejudicial effect.", "(C) Yes, because prior convictions are probative to impeach the witness's character for truthfulness.", "(D) Yes, because the crime involved an act of dishonesty."], correct: "B" },
  { id: 1003, category: "Evidence", question: "A plaintiff sued a department store for injuries sustained when she slipped and fell. At trial, the plaintiff proposes to testify that when the store manager rushed to the scene, he said, \"I'm so sorry about the water on the floor there, but don't worry — the store will pay for the ambulance and your hospital bill.\" How should the court rule on admissibility?", answers: ["(A) The testimony is admissible in its entirety as the statement of an opposing party.", "(B) The testimony about the water is an admissible statement of an opposing party, but the rest is inadmissible as an offer to pay medical expenses.", "(C) The testimony is inadmissible in its entirety, because it is hearsay not within any exception.", "(D) The testimony is inadmissible in its entirety, because the manager's statement is in the context of an offer to pay medical expenses."], correct: "B" },
  { id: 1004, category: "Evidence", question: "A defendant is on trial for theft of a used car he took for a test drive and did not return. He was arrested in the car two days later. In his defense, the defendant testified he had no intention of keeping the car but delayed returning it due to marital problems. The defendant calls a witness to testify that the defendant told him during those two days, \"I'm going to return this car as soon as I work things out with my wife.\" Is the witness's testimony admissible?", answers: ["(A) No, because it is a self-serving statement by an accused.", "(B) No, because it is hearsay not within any exception.", "(C) Yes, as a prior consistent statement of the defendant.", "(D) Yes, as a statement by the defendant of his then-existing state of mind."], correct: "D" },
  { id: 1005, category: "Evidence", question: "A plaintiff sued an industrial facility for injuries caused by air pollution. She testified she could not remember specific times she observed large amounts of dust but maintained a diary in which she accurately recorded this information daily. When her attorney sought to refresh her recollection with her diary, she still could not remember. The plaintiff's attorney seeks to have the diary information admitted at trial. Is the information admissible?", answers: ["(A) No, because reviewing it did not refresh the plaintiff's recollection.", "(B) No, unless it is offered by the defendant.", "(C) Yes, and the plaintiff should be allowed the option of reading it into evidence or having the diary received as an exhibit.", "(D) Yes, and the plaintiff should be allowed to read the diary into evidence."], correct: "D" },
  { id: 1006, category: "Evidence", question: "At trial in a criminal prosecution for theft, the defendant calls a witness to testify that he formerly knew the defendant as an army supply sergeant and that the defendant had turned down many opportunities for black marketeering. Is the witness's testimony admissible?", answers: ["(A) No, because it is irrelevant to the present charge.", "(B) No, because the defendant may not prove his good character by specific instances of good conduct.", "(C) Yes, because a criminal defendant may prove his good character as a basis for inferring conduct.", "(D) Yes, because, by accusing the defendant of being a thief, the prosecution has put his character in issue."], correct: "B" },
  { id: 1007, category: "Evidence", question: "A plaintiff and defendant dissolved a business partnership. Both hired new counsel. The plaintiff calls the business attorney they had jointly consulted to testify to representations the defendant made in meetings with the plaintiff and business attorney. The defendant objects invoking the attorney-client privilege. Should the court uphold the defendant's privilege claim?", answers: ["(A) No, because the business attorney's professional relationship with the plaintiff and the defendant has ended.", "(B) No, because the plaintiff and the defendant consulted the business attorney jointly.", "(C) Yes, because either the plaintiff or the defendant may block disclosure of statements made during such meetings.", "(D) Yes, because either the plaintiff or the defendant may claim the privilege on behalf of the partnership."], correct: "B" },
  { id: 1008, category: "Evidence", question: "A defendant is on trial for kidnapping. The victim testified that one of the kidnappers referred to the other as \"Speed.\" The prosecutor calls a jail employee to testify that, while the defendant was in jail awaiting trial, other inmates addressed the defendant as \"Speed.\" Is the jail employee's testimony admissible?", answers: ["(A) No, because it is hearsay not within any exception.", "(B) No, because it is substantially more prejudicial than probative.", "(C) Yes, as circumstantial evidence that the defendant was one of the kidnappers.", "(D) Yes, to corroborate the truthfulness of the victim."], correct: "C" },
  { id: 1009, category: "Evidence", question: "A defendant accountant was charged with fraud for helping a client file false tax returns by shifting medical expenses from one year to another. He pleaded not guilty, claiming an honest mistake as to the date expenses were paid. The prosecutor offers evidence of the defendant's involvement in an earlier scheme to help a different client falsify tax returns the same way. Is the evidence of the defendant's involvement in the earlier scheme admissible?", answers: ["(A) No, because it is impermissible character evidence.", "(B) No, because it is not relevant to the issues in this case.", "(C) Yes, to show absence of mistake.", "(D) Yes, to show the defendant's propensity to commit the crime."], correct: "C" },
  { id: 1010, category: "Evidence", question: "At a defendant's burglary trial, a witness testified without objection that the defendant said shortly after his arrest, \"They've got the wrong person for this, because I have an alibi.\" The prosecutor seeks to cross-examine the witness about why she did not mention that statement when the police asked her whether the defendant had said anything about having an alibi. Is the prosecutor's proposed cross-examination proper?", answers: ["(A) No, because the witness's character for truthfulness cannot be attacked by specific instances of conduct.", "(B) No, because the witness's failure to mention the alibi is collateral and ambiguous.", "(C) Yes, as impeachment for bias and interest.", "(D) Yes, as impeachment for prior inconsistency."], correct: "D" },
  { id: 1011, category: "Evidence", question: "A plaintiff sued over title to riverbank land. A commercial fisherman had kept a daily log of water levels at his dock for 15 years to forecast fishing conditions. The plaintiff hired a draftsman to graph the data from the logs as a trial exhibit. The fisherman testified to the care with which he had made and recorded measurements, and the draftsman testified to how he prepared the graphs. With this foundation, are the graphs admissible?", answers: ["(A) No, because they are hearsay not within any exception.", "(B) No, because they violate the \"best evidence\" rule.", "(C) Yes, as summaries of voluminous business records.", "(D) Yes, as the draftsman's expert opinion of the water levels."], correct: "C" },
  { id: 1012, category: "Evidence", question: "A plaintiff sued a slicing machine manufacturer for negligent design after the machine cut off his finger. The manufacturer offered evidence that it was unreasonably expensive to prevent the wires from coming into contact. In rebuttal, the plaintiff offers evidence that after this action was filed, the manufacturer redesigned the machine to prevent the wires from coming into contact. Is evidence of this change in design admissible?", answers: ["(A) No, because the change in design may have been unrelated to this type of accident.", "(B) No, under the rule regarding remedial measures that encourages manufacturers to make their products safer.", "(C) Yes, as evidence tending to show that the machine could be designed to keep the wires from coming into contact.", "(D) Yes, as evidence tending to show that the manufacturer was negligent because its initial design failed to prevent the wires from coming into contact."], correct: "C" },
  { id: 1013, category: "Evidence", question: "A plaintiff sued a lawn mower manufacturer alleging a design defect caused the blade to fly off. The manufacturer called a product safety engineer who testified he was retained for a fee to test identical mowers and, if his opinion was helpful, to testify. He testified that the blade, as designed and installed, could not fly off in the manner claimed. Assume he used a reliable method. Should the court admit the expert's testimony?", answers: ["(A) No, because it goes to an ultimate issue that only the jury can decide.", "(B) No, because the manufacturer paid the expert to render a certain opinion, in violation of rules barring paid testimony.", "(C) Yes, because expert testimony on such issues of causation is relevant and helpful to the jury.", "(D) Yes, provided that the plaintiff had notice and an opportunity to participate in the testing process."], correct: "C" },
  { id: 1014, category: "Evidence", question: "A defendant is on trial for bribing a government procurement officer by providing free vacation facilities. The defendant also said to an FBI investigator that she would reveal some \"hot\" information on a large-scale fraud in exchange for the investigator's promise to \"stop worrying about a little vacation.\" Is the investigator's testimony about the defendant's offer to give information admissible?", answers: ["(A) No, because it is hearsay not within any exception.", "(B) No, because the defendant made the offer in a negotiation for settlement of a criminal investigation.", "(C) Yes, as a matter observed and reported by the investigator pursuant to a duty imposed by law.", "(D) Yes, as a statement of an opposing party."], correct: "D" },
  { id: 1015, category: "Evidence", question: "A plaintiff, a former city employee, sued the city for wrongful discharge. At trial, the plaintiff called the supervisor as an adverse witness, who testified the plaintiff was fired for incompetence. The plaintiff's attorney then asks the supervisor, \"Isn't it true that before the discharge you were told that [the plaintiff] had reported to the police that you were pilfering money from the office coffee fund?\" For what purpose(s) is the plaintiff's question permissible?", answers: ["(A) Only to establish the supervisor's improper motive in discharging the plaintiff.", "(B) Only to impeach the supervisor's veracity as a witness because of her dishonesty.", "(C) Only to impeach the supervisor's veracity as a witness because of her personal bias against her accuser, the plaintiff.", "(D) Both to impeach by showing bias and to establish improper motive in discharging the plaintiff."], correct: "D" },
  { id: 1016, category: "Evidence", question: "A defendant is on trial for the murder of a woman who disappeared ten years ago and has not been heard from since. Her body has never been found. The prosecutor has requested the following instruction based on a recognized presumption in the jurisdiction: \"A person missing and not heard from in the last seven years shall be presumed to be deceased.\" Is the instruction proper?", answers: ["(A) No, because the fact that someone has not been heard from in seven years does not necessarily lead to a conclusion that the person is dead.", "(B) No, because mandatory presumptions are not allowed against a criminal defendant on an element of the charged crime.", "(C) Yes, because it expresses a rational conclusion that the jury should be required to accept.", "(D) Yes, because the defendant has a chance to rebut the presumption by offering evidence that the woman is alive or has been heard from in the last seven years."], correct: "B" },
  { id: 1017, category: "Evidence", question: "Several defendants were charged with securities fraud. The government called an executive who had not been charged and had been given immunity to authenticate handwritten notes she made after management meetings at which the alleged fraud was discussed. The witness testified she prepared the notes on her own initiative to help her remember what had happened. The government offered the notes to establish what happened at the meetings. Should the notes be admitted?", answers: ["(A) No, because the notes are hearsay not within any exception.", "(B) No, because the witness's immunity agreement makes her notes untrustworthy and substantially more prejudicial than probative.", "(C) Yes, because they are business records.", "(D) Yes, because they are past recollections recorded."], correct: "A" },
  { id: 1018, category: "Evidence", question: "A plaintiff sued a defendant, alleging she was seriously injured when the defendant ran a red light and struck her in a crosswalk. During the defendant's case, a witness testified that the plaintiff had told him that she was \"barely touched\" by the defendant's car. On cross-examination, should the court allow the plaintiff to elicit from the witness the fact that he is an adjuster for the defendant's insurance company?", answers: ["(A) No, because testimony about liability insurance is barred by the rules of evidence.", "(B) No, because the reference to insurance raises a collateral issue.", "(C) Yes, for both substantive and impeachment purposes.", "(D) Yes, for impeachment purposes only."], correct: "D" },
  { id: 1019, category: "Evidence", question: "A plaintiff sued his insurance company for the proceeds of a casualty policy covering his 60-foot yacht, claiming the yacht was destroyed by accidental fire. The company claimed the plaintiff hired his friend to set the fire. In the hospital the day after the fire, the friend said to his wife in the presence of a nurse, \"I was paid to set the fire.\" Two weeks later, the friend died of an infection from the burns. At trial, the insurance company called the wife to testify to the friend's statement. Is the wife's testimony admissible over the plaintiff's objection?", answers: ["(A) No, because the marital privilege survives the communicating spouse's death.", "(B) No, because the statement was made after the conspiracy ended.", "(C) Yes, because it is a statement against interest.", "(D) Yes, because it is a statement by a co-conspirator."], correct: "C" },
  { id: 1020, category: "Evidence", question: "A defendant charged with possession of marijuana with intent to distribute testified on direct that he worked with disadvantaged children as a drug counselor, that he hated drugs, that he would \"never possess or distribute drugs,\" and had never used drugs and would not touch them. The government offered a police officer to testify that three years earlier he saw the defendant buy cocaine from a street dealer. Is the officer's testimony admissible to impeach the defendant?", answers: ["(A) No, because the bad act of buying drugs is not sufficiently probative of a witness's character for truthfulness.", "(B) No, because it is contradiction on a collateral matter.", "(C) Yes, because it is proper contradiction.", "(D) Yes, because the bad act shows a disregard for the law and makes it less likely that the defendant would respect the oath of truthfulness."], correct: "C" },
  { id: 1021, category: "Evidence", question: "A woman sued her friend for injuries she received as a passenger in the friend's car. She testified the friend had been speeding and ran a red light. On cross-examination, the woman was asked whether she was under the influence of drugs at the time of the accident. The woman invoked the privilege against self-incrimination. How should the court treat the woman's claim of privilege?", answers: ["(A) Deny it, because the woman waived the privilege by voluntarily testifying.", "(B) Deny it, because evidence of the woman's drug intoxication is essential to assessing the accuracy of her observations.", "(C) Uphold it, because the privilege applies in both civil and criminal cases.", "(D) Uphold it, because the woman's credibility cannot be impeached by a crime for which she has not been convicted."], correct: "C" },
  { id: 1022, category: "Evidence", question: "A consumer sued a microwave oven manufacturer for burn injuries from negligent failure to warn. The consumer offered three letters, all received by the manufacturer before the oven was shipped, in which customers complained of serious burns under similar circumstances. The manufacturer objected on hearsay grounds and alternatively asked for a limiting instruction that the letters be considered only for notice, not for the truth of the assertions. How should the court respond?", answers: ["(A) The court should sustain the objection and treat the request for a limiting instruction as moot.", "(B) The court should overrule the objection and deny the request for a limiting instruction.", "(C) The court should overrule the objection and give the limiting instruction.", "(D) The court should overrule the objection but allow only that the letters be read to the jury, not received as exhibits."], correct: "C" },
  { id: 1023, category: "Evidence", question: "A plaintiff sued for injuries arising from a car accident, claiming a back injury. At trial, she wishes to testify that prior to the accident she had never had any problems with her back. Is the plaintiff's proposed testimony admissible?", answers: ["(A) No, because the plaintiff has not been qualified as an expert.", "(B) No, because the plaintiff's pain could have been caused by factors arising after the accident, such as an injury at work.", "(C) Yes, because it is probative evidence of the plaintiff's injury.", "(D) Yes, because the testimony of parties is not subject to the lay opinion rule."], correct: "C" },
  { id: 1024, category: "Evidence", question: "A plaintiff offered in evidence a color photograph of himself made from a videotape taken by a television news crew at the accident scene. The plaintiff demonstrated that the videotape had since been routinely reused by the station and the footage was erased. The photograph shows the plaintiff moments after the collision, with his bloodied head protruding at a grotesque angle through the broken windshield. Should the photograph be admitted over the defendant's objection?", answers: ["(A) No, because the plaintiff has failed to establish that a duplicate could not be found.", "(B) No, because the plaintiff has failed to produce the original videotape or a duplicate.", "(C) Yes, because it tends to prove a controverted fact.", "(D) Yes, because a photograph that establishes a disputed fact cannot be excluded as prejudicial."], correct: "C" },
  { id: 1025, category: "Evidence", question: "A cyclist sued a corporation for injuries when she was hit by the defendant's truck during deliveries. The day after the accident, the employee visited the cyclist in the hospital and said, \"I'm sorry for what I did.\" At trial, the employee testified that he had exercised due care. Why is the cyclist's testimony relating what the defendant's employee said at the hospital admissible to prove negligence?", answers: ["(A) It is a prior inconsistent statement.", "(B) It is a statement against interest.", "(C) It is a statement by a party-opponent's agent.", "(D) It is a statement of then-existing state of mind."], correct: "C" },
  { id: 1026, category: "Evidence", question: "A defendant is on trial for bank robbery. A bank teller testified for the prosecution after refreshing her memory by looking at an FBI agent's investigative report created shortly after the robbery. The defendant has asked to examine the report. How should the court respond?", answers: ["(A) The court may allow the examination if the report was used by the teller to refresh her memory before testifying, and must allow it if she used it during her testimony.", "(B) The court must allow the examination, but only to the extent that the report contains the teller's own statement to the FBI agent.", "(C) The court should not allow the examination, unless the report was used by the teller to refresh her memory while on the witness stand.", "(D) The court should not allow the examination, because the report was not shown to have been read and approved by the teller while the matter was fresh in her mind."], correct: "A" },
  { id: 1027, category: "Evidence", question: "A patient sued a hospital for medical negligence, claiming a nurse failed to administer critical medication. To prove the nurse's failure, the patient called the medical records librarian who authenticated the hospital's record of treatment, which contained no entry showing that the medication had been administered. Is the hospital record admissible?", answers: ["(A) No, because it is hearsay not within any exception.", "(B) No, because the nurse's testimony would be the best evidence of her actions in treating the plaintiff.", "(C) Yes, although hearsay, because it is a statement against interest by agents of the hospital.", "(D) Yes, because it is within the hearsay exception covering the absence of entries in business records."], correct: "D" },
  { id: 1028, category: "Evidence", question: "A college student sued an amusement company for injuries when the roller coaster allegedly malfunctioned and he fell out. The amusement company called a witness who testified that just before the accident he heard a bystander say, \"That crazy fool is standing up in the car.\" The student then offered the testimony of another witness who would testify that the day after the accident the same bystander described the accident and said the car jerked suddenly and \"just threw the guy out of his seat.\" How should the court rule?", answers: ["(A) Rule it admissible only to impeach the bystander's credibility.", "(B) Rule it admissible to impeach the bystander's credibility and to prove the amusement company's negligence.", "(C) Rule it inadmissible, because the bystander was given no opportunity to deny or explain her apparently inconsistent statement.", "(D) Rule it inadmissible, because the bystander herself was not called as a witness."], correct: "A" },
  { id: 1029, category: "Evidence", question: "A defendant was charged with robbery. An hour after the robbery, the officer videotaped an interview with an eyewitness who described the crime and the robber. The teller who was robbed identified the defendant in a lineup. The officer obtained computerized records of that day's deposits and withdrawals. A month later, the teller testified before a grand jury. The teller and eyewitness both died afterward. At trial, which evidence, if properly authenticated, may be admitted over an objection that it would violate the confrontation clause?", answers: ["(A) A transcript of the teller's sworn grand jury testimony.", "(B) The computerized records from the savings and loan.", "(C) The officer's testimony that the teller picked the defendant out of the lineup.", "(D) The videotape of the eyewitness's statement."], correct: "B" },
  { id: 1030, category: "Evidence", question: "A defendant is being prosecuted for conspiracy to possess cocaine with intent to distribute. The government seeks to have its agent testify to a conversation he overheard between the defendant and a co-conspirator regarding an incoming cocaine shipment. That conversation was also audiotaped, though critical portions are inaudible. The defendant objects that the testimony is not the best evidence of the conversation. Is the testimony admissible?", answers: ["(A) No, because the testimony of the agent is not the best evidence of the conversation.", "(B) No, because the testimony of the agent reports hearsay not within any exception.", "(C) Yes, because the best evidence rule does not require proof of the conversation through the audiotape.", "(D) Yes, because the audiotape is partly inaudible."], correct: "C" },
  { id: 1031, category: "Evidence", question: "A plaintiff sued his employer for illegal racial discrimination. He called a witness expecting him to testify that the employer had admitted the racial motivation. Instead, the witness testified that the employer said he fired the plaintiff for frequent absenteeism. While the witness is still on the stand, the plaintiff offers a properly authenticated secret tape recording made at a meeting with the witness in which the witness related the employer's admissions of racial motivation. The tape recording is:", answers: ["(A) admissible as evidence of the employer's racial motivation and to impeach the witness's testimony.", "(B) admissible only to impeach the witness's testimony.", "(C) inadmissible, because it is hearsay not within any exception.", "(D) inadmissible, because a secret recording is an invasion of the witness's right of privacy under the U.S. Constitution."], correct: "B" },
  { id: 1032, category: "Evidence", question: "At a defendant's burglary trial, a witness supported the defendant's alibi that they were fishing together at the time of the crime. On cross-examination, the witness was asked whether his statement on a credit card application that he had worked for his present employer for the last five years was false. The witness denied it. The prosecutor then calls the manager to testify that although the witness was first employed five years earlier, there was a three-year gap when he had not been employed there. The manager's testimony is:", answers: ["(A) admissible, in the judge's discretion, because the witness's credibility is a fact of major consequence to the case.", "(B) admissible, as a matter of right, because the witness \"opened the door\" by his denial on cross-examination.", "(C) inadmissible, because whether the witness lied in his application is a matter that cannot be proved by extrinsic evidence.", "(D) inadmissible, because the misstatement by the witness could have been caused by misunderstanding of the application form."], correct: "C" },
  { id: 1033, category: "Evidence", question: "A defendant was charged with attempted murder of a victim in a sniping incident. The prosecutor offers evidence that seven years earlier the defendant had fired a shotgun into a woman's home and had once pointed a handgun at another driver while driving on the street. This evidence should be:", answers: ["(A) excluded, because such evidence can be elicited only during cross-examination.", "(B) excluded, because it is improper character evidence.", "(C) admitted as evidence of the defendant's propensity toward violence.", "(D) admitted as relevant evidence of the defendant's identity, plan, or motive."], correct: "B" },
  { id: 1034, category: "Evidence", question: "In a federal investigation for tax fraud, the grand jury seeks a letter written by the defendant to her attorney stating: \"Please prepare a deed giving my ranch to the local university but, in order to get around the tax law, I want it back-dated to December 15.\" The attorney refuses to produce the letter on grounds of privilege. Production of the letter should be:", answers: ["(A) prohibited, because the statement is protected by the attorney-client privilege.", "(B) prohibited, because the statement is protected by the client's privilege against self-incrimination.", "(C) required, because the statement was in furtherance of crime or fraud.", "(D) required, because the attorney-client privilege belongs to the client and can be claimed only by her."], correct: "C" },
  { id: 1035, category: "Evidence", question: "A plaintiff sued a defendant auto manufacturer for his wife's death, claiming a defective steering mechanism caused the car to veer off the road. The manufacturer claims the steering mechanism was damaged in the collision and offers testimony that the deceased wife was intoxicated at the time of the accident. Testimony concerning the wife's intoxication is:", answers: ["(A) admissible to provide an alternate explanation of the accident's cause.", "(B) admissible as proper evidence of the wife's character.", "(C) inadmissible, because it is improper to prove character evidence by specific conduct.", "(D) inadmissible, because it is substantially more prejudicial than probative."], correct: "A" },
  { id: 1036, category: "Evidence", question: "The prosecution calls Witness, an undercover officer, to testify that when Seller sold the drugs to Witness, Seller introduced Defendant to Witness as \"my partner in this\" and Defendant shook hands with Witness but said nothing. Witness's testimony is:", answers: ["(A) inadmissible, because there is no evidence that Seller was authorized to speak for Defendant.", "(B) inadmissible, because the statement of Seller is hearsay not within any exception.", "(C) admissible as a statement against Defendant's penal interest.", "(D) admissible as Defendant's adoption of Seller's statement."], correct: "D" },
  { id: 1037, category: "Evidence", question: "A guard was convicted of manslaughter for killing the plaintiff. At his criminal trial, the guard, no longer working for the defendant, testified that the defendant's security director had instructed him to stop shoplifters \"at all costs.\" Because the guard's criminal conviction is on appeal, he refuses to testify at the civil trial. The plaintiff's estate then offers an authenticated transcript of the guard's criminal trial testimony concerning the instructions. This evidence is:", answers: ["(A) admissible as a statement of an agent of a party opponent.", "(B) admissible, because the instruction from the security director is not hearsay.", "(C) admissible, although hearsay, as former testimony.", "(D) inadmissible, because it is hearsay not within any exception."], correct: "D" },
  { id: 1038, category: "Evidence", question: "An undercover officer testifies that when the drug dealer sold drugs to the witness, the dealer introduced the defendant as \"my partner in this,\" and the defendant shook hands but said nothing. The witness's testimony is:", answers: ["(A) inadmissible, because there is no evidence that the dealer was authorized to speak for the defendant.", "(B) inadmissible, because the statement of the dealer is hearsay not within any exception.", "(C) admissible as a statement against the defendant's penal interest.", "(D) admissible as the defendant's adoption of the dealer's statement."], correct: "D" },
  { id: 1039, category: "Evidence", question: "In a federal civil trial, a plaintiff wishes to establish that the defendant had been convicted of fraud in state court, a fact the defendant denies. Which mode of proof of the conviction is LEAST likely to be permitted?", answers: ["(A) A certified copy of the judgment of conviction, offered as a self-authenticating document.", "(B) Testimony of the plaintiff, who was present at the time of the sentence.", "(C) Testimony by a witness to whom the defendant made an oral admission that he had been convicted.", "(D) Judicial notice of the conviction, based on the court's telephone call to the clerk of the state court, whom the judge knows personally."], correct: "D" },
  { id: 1040, category: "Evidence", question: "A widow offers to testify that the day before her husband was killed, he described a chance meeting with the defendant in which the defendant said, \"I'm going to blow your head off one of these days.\" The widow's testimony concerning her husband's statement is:", answers: ["(A) admissible, to show the defendant's state of mind.", "(B) admissible, because the defendant's statement is that of a party-opponent.", "(C) inadmissible, because it is improper evidence of a prior bad act.", "(D) inadmissible, because it is hearsay not within any exception."], correct: "B" },
  { id: 1041, category: "Evidence", question: "A defendant entered a guilty plea to embezzlement. Her attorney hired a retired probation officer as a consultant to gather information for a sentencing plan to avoid jail. For that purpose, the consultant interviewed the defendant for three hours. Later, the prosecution began investigating other acts of embezzlement. The consultant was subpoenaed to testify before a grand jury and refused to answer any questions about her conversation with the defendant. The prosecution moved for an order requiring her to answer. The motion should be:", answers: ["(A) denied, on the basis of the attorney-client privilege.", "(B) denied, in the absence of probable cause to believe the interview developed evidence relevant to the grand jury's inquiry.", "(C) granted, because the consultant is not an attorney.", "(D) granted, because exclusionary evidentiary rules do not apply in grand jury proceedings."], correct: "A" },
  { id: 1042, category: "Evidence", question: "A defendant is on trial for the murder of his father. The defendant's defense is that he shot his father accidentally. The prosecutor calls a police officer to testify that on two occasions in the prior year, he had been called to the defendant's home because of complaints of loud arguments and had found it necessary to stop the defendant from beating his father. The evidence is:", answers: ["(A) inadmissible, because it is improper character evidence.", "(B) inadmissible, because the officer lacks firsthand knowledge of who started the quarrels.", "(C) admissible to show that the defendant killed his father intentionally.", "(D) admissible to show that the defendant is a violent person."], correct: "C" },
  { id: 1043, category: "Evidence", question: "A plaintiff sued a defendant under an age discrimination statute, alleging the defendant refused to hire her because she was over age 65. The defendant seeks to testify that the plaintiff's former employer advised him not to hire the plaintiff because she was unable to perform productively for more than four hours a day. The testimony of the defendant is:", answers: ["(A) inadmissible, because the defendant's opinion of the plaintiff's abilities is not based on personal knowledge.", "(B) inadmissible, because the plaintiff's former employer's statement is hearsay not within any exception.", "(C) admissible as evidence that the plaintiff would be unable to work longer than four hours per day.", "(D) admissible as evidence of the defendant's reason for refusing to hire the plaintiff."], correct: "D" },
  { id: 1044, category: "Evidence", question: "A plaintiff sued a defendant for personal injuries from an automobile accident. Which of the following would be an error?", answers: ["(A) The judge allows the defendant's attorney to ask the defendant questions on cross-examination that go well beyond the scope of direct examination by the plaintiff, who has called the defendant as an adverse witness.", "(B) The judge refuses to allow the defendant's attorney to cross-examine the defendant by leading questions.", "(C) The judge allows cross-examination about the credibility of a witness even though no question relating to credibility has been asked on direct examination.", "(D) The judge, despite the defendant's request for exclusion of witnesses, allows the plaintiff's eyewitness to remain in the courtroom after testifying, even though the eyewitness is expected to be recalled for further cross-examination."], correct: "B" },
  { id: 1045, category: "Evidence", question: "A police officer testified that after the defendant was arrested and agreed to answer questions, the officer interrogated him with a stenographer present but could not now recall what the defendant had said. The prosecutor presented the officer with a photocopy of the stenographic transcript. The officer, after looking at it, was prepared to testify that he recalled the defendant admitted to being in the area of the burglary. The defendant objected that it violated the 'original document' rule. Should the officer's testimony be admitted?", answers: ["(A) No, because a photocopy cannot be used without a showing that the original is unavailable.", "(B) No, because the stenographer has not testified to the accuracy of the transcript.", "(C) Yes, because a photocopy is a duplicate of the original.", "(D) Yes, because the prosecutor is not attempting to prove the contents of the document."], correct: "D" },
  { id: 1046, category: "Evidence", question: "A defendant is on trial for extorting $10,000 from a victim. The victim is prepared to testify that the caller had a distinctive accent like the defendant's, but cannot positively identify the voice as the defendant's. The victim recorded the call but has not brought the tape to court, although its existence is known to the defendant. The victim's testimony is:", answers: ["(A) inadmissible, because the victim cannot sufficiently identify the caller.", "(B) inadmissible, because the tape recording of the conversation is the best evidence.", "(C) admissible, because the defendant waived the \"best evidence\" rule by failing to subpoena the tape.", "(D) admissible, because the victim's lack of certainty goes to the weight to be given the victim's testimony, not to its admissibility."], correct: "D" },
  { id: 1047, category: "Evidence", question: "A plaintiff construction company sued a defendant development company for money owed on a cost-plus contract. The plaintiff's general manager offers to testify that it is the plaintiff's routine practice to send cost overrun notices as required by the contract. He also offers a photocopy of the cost overrun notice letter to the defendant taken from the plaintiff's regular business files. On the issue of giving notice, the letter copy is:", answers: ["(A) admissible, though hearsay, under the business record exception.", "(B) admissible, because of the routine practices of the company.", "(C) inadmissible, because it is hearsay not within any exception.", "(D) inadmissible, because it is not the best evidence of the notice."], correct: "B" },
  { id: 1048, category: "Evidence", question: "A defendant has pleaded not guilty to federal bank robbery. The principal issue is the identity of the robber. The prosecutor calls the defendant's wife to testify to the clothing the defendant wore as he left their house on the day of the robbery, expecting her description to match that of eyewitnesses. Both the defendant and his wife object to her testifying against the defendant. Should the wife be required to testify?", answers: ["(A) No, because the defendant has a privilege to prevent his wife from testifying against him in a criminal case.", "(B) No, because the wife has a privilege not to testify against her husband in a criminal case.", "(C) Yes, because the interspousal privilege does not apply in criminal cases.", "(D) Yes, because the wife's viewing of the defendant's clothing was not a confidential communication."], correct: "B" },
  { id: 1049, category: "Evidence", question: "A defendant was charged with conspiracy to possess cocaine with intent to distribute. While on bail with travel restricted to his home state, he purchased an airplane ticket to another country using an alias. At trial, the prosecution seeks to introduce evidence of the defendant's ticket purchase. Should the court admit this evidence?", answers: ["(A) No, because the evidence does not make any fact of consequence to the trial more or less probable.", "(B) Yes, because the evidence is relevant both to show the defendant's consciousness of guilt and to show his motive to commit the crime.", "(C) Yes, because the evidence is relevant to show the defendant's consciousness of guilt.", "(D) Yes, because the evidence is relevant to show the defendant's motive to commit the crime."], correct: "C" },
  { id: 1050, category: "Evidence", question: "A defendant is charged with falsely claiming deductions on her federal income tax return. A witness testified for the defendant that she has a reputation in the community for complete honesty. After a sidebar conference at which the prosecutor gave the judge a record showing the defendant's medical school had disciplined her for altering her transcript, the prosecutor proposes to ask the witness on cross-examination: \"Have you ever heard that the defendant falsified her medical school transcript?\" Is the prosecutor's question proper?", answers: ["(A) No, because it calls for hearsay not within any exception.", "(B) No, because its minimal relevance on the issue of income tax fraud is substantially outweighed by the danger of unfair prejudice.", "(C) Yes, because an affirmative answer will be probative of the defendant's bad character for honesty and, therefore, her guilt.", "(D) Yes, because an affirmative answer will impeach the witness's credibility."], correct: "D" },
  { id: 1051, category: "Evidence", question: "A plaintiff's attorney calls the investigator, who offers to testify that the witness told him, \"I never saw [the plaintiff] fall.\" The plaintiff objects to admission of the investigator's testimony about the witness's out-of-court statement. Should the court admit the investigator's testimony about the witness's out-of-court statement?", answers: ["(A) No, because the statement is inadmissible hearsay not within any hearsay exception.", "(B) No, because the witness denied making the statement.", "(C) Yes, to prove that the plaintiff did not fall and to impeach the witness.", "(D) Yes, but only for the limited purpose of impeaching the witness's trial testimony."], correct: "D" },
  { id: 1052, category: "Evidence", question: "A plaintiff called an eyewitness who testified that the train was going 20 miles per hour. The defendant then offers the testimony of an experienced police accident investigator that, based on his training and experience and his examination of the physical evidence, the train was going between five and ten miles per hour. Testimony by the investigator is:", answers: ["(A) improper, because there cannot be both lay and expert opinion on the same issue.", "(B) improper, because the investigator is unable to establish the speed with a sufficient degree of scientific certainty.", "(C) proper, because a police accident investigator has sufficient expertise to express an opinion on speed.", "(D) proper, because the plaintiff first introduced opinion evidence as to speed."], correct: "C" },
  { id: 1053, category: "Evidence", question: "A defendant is charged with murder in connection with a carjacking. The prosecutor calls the victim's four-year-old son, whose face was horribly disfigured by the same bullet, to testify that the defendant shot his father and him. The son's testimony should be:", answers: ["(A) admitted, provided the prosecutor first provides evidence that persuades the judge that the son is competent to testify despite his tender age.", "(B) admitted, provided there is sufficient basis for believing that the son has personal knowledge and understands his obligation to testify truthfully.", "(C) excluded, because it is insufficiently probative in view of the son's tender age.", "(D) excluded, because it is more unfairly prejudicial than probative."], correct: "B" },
  { id: 1054, category: "Evidence", question: "A drug enforcement agent informed that a person arriving from Europe on a particular flight answering a particular description would be carrying cocaine. He found a small brass statue with a false bottom containing one ounce of cocaine. At trial, the defendant claimed he was unaware cocaine was hidden in the statue's base. The prosecution offers to prove the defendant was convicted fifteen years earlier of illegally importing cocaine by hiding it in the base of a brass statue. The court should rule proof of this prior conviction is:", answers: ["(A) admissible, as evidence of habit.", "(B) admissible, because it is evidence of a distinctive method of operation.", "(C) inadmissible, because evidence of previous conduct by a defendant may not be used against him.", "(D) inadmissible, because the prior conviction occurred more than ten years before the trial."], correct: "B" },
  { id: 1055, category: "Evidence", question: "A priest apologized to a woman struck by a vehicle, saying, \"I'm sorry. It isn't my car. I didn't know that the brakes were bad.\" The woman instituted an action against an accountant asserting he owned the vehicle and was negligent in permitting the vehicle to be driven while he knew the brakes needed repair. The accountant denied ownership. At trial, the plaintiff offered testimony by a car mechanic that on the day after the accident the accountant hired him to completely overhaul the brakes. Upon objection, the evidence is:", answers: ["(A) admissible, to show that the accountant was the owner of the vehicle.", "(B) admissible, to show that the brakes were in need of repair on the day of the accident.", "(C) inadmissible, because the condition of the vehicle on any day other than that of the accident is irrelevant to show its condition at the time the accident occurred.", "(D) inadmissible, under a policy which encourages safety precautions."], correct: "A" },
  { id: 1056, category: "Evidence", question: "At a defendant's trial for theft, a witness testified that he saw thieves break a jewelry store window and take jewelry and leave in a car. His wife telephoned the police and relayed to them the license number of the thieves' car as the witness read it to her through binoculars. He has no present memory of the number, but immediately afterward he listened to a playback of the police tape recording and verified his wife had relayed the number accurately. Playing the tape recording for the jury would be:", answers: ["(A) proper, because it is recorded recollection.", "(B) proper, because it is a public record or report.", "(C) improper, because it is hearsay not within any exception.", "(D) improper, because the witness's wife lacked firsthand knowledge of the license number."], correct: "A" },
  { id: 1057, category: "Evidence", question: "In an automobile negligence action, a co-worker of the plaintiff testified for the plaintiff. The defendant later called a neighbor of the co-worker, who testified that the co-worker's reputation for truthfulness was bad. On cross-examination of the neighbor, the plaintiff's counsel asks, \"Isn't it a fact that when you bought your new car last year, you made a false affidavit to escape paying the sales tax?\" This question is:", answers: ["(A) proper, because it will indicate the neighbor's standard of judgment as to reputation for truthfulness.", "(B) proper, because it bears on the neighbor's credibility.", "(C) improper, because character cannot be proved by specific instances of conduct.", "(D) improper, because one cannot impeach an impeaching witness."], correct: "B" },
  { id: 1058, category: "Evidence", question: "A plaintiff called a male tenant to testify that a woman who was also a tenant in the building had said to the man, a week before the plaintiff's fall, \"When I paid my rent this morning, I told the manager that he had better fix that torn carpet.\" The statement by the woman tenant, reported by the male tenant, is:", answers: ["(A) admissible, to prove that the carpet was defective.", "(B) admissible, to prove that the defendant had notice of the defect.", "(C) admissible, to prove both that the carpet was defective and that the defendant had notice of the defect.", "(D) inadmissible, because it is hearsay not within any exception."], correct: "D" },
  { id: 1059, category: "Evidence", question: "A plaintiff's doctor testified that the disability was caused by trauma. On cross-examination, the plaintiff's doctor agreed that a medical textbook was authoritative and agreed with passages shown to her, but stated they were inapplicable to the plaintiff's condition because they dealt with rheumatoid arthritis rather than the osteoarthritis at issue. The defendant's expert testified there is no difference between the two kinds of arthritis for this issue. The defendant's counsel then asks permission to read to the jury the textbook passages. The judge should rule the textbook passages:", answers: ["(A) admissible only for the purpose of impeaching the plaintiff's doctor.", "(B) admissible as substantive evidence if the judge determines that the passages are relevant.", "(C) inadmissible, because they are hearsay not within any exception.", "(D) inadmissible, because the plaintiff's doctor contended that they are not relevant to the plaintiff's condition."], correct: "B" },
  { id: 1060, category: "Evidence", question: "A carpenter and an electrician are charged with burgling a warehouse together, tried separately. At the carpenter's trial, the electrician testified that he saw the carpenter commit the burglary. While the electrician is still subject to recall, the carpenter calls a person who was recently the electrician's cellmate, and proposes to have the cellmate testify that the electrician told him, \"I broke into the warehouse alone because the carpenter was too drunk to help.\" This evidence of the electrician's statement is:", answers: ["(A) admissible as a declaration against penal interest.", "(B) admissible as a prior inconsistent statement.", "(C) inadmissible, because it is hearsay not within any exception.", "(D) inadmissible, because the statement is not clearly corroborated."], correct: "B" },
  { id: 1061, category: "Evidence", question: "A plaintiff sued a defendant for breach of a commercial contract. The plaintiff called an expert witness to testify as to damages. The defendant seeks to show that the expert witness had provided false testimony as a witness in his own divorce proceedings. This evidence should be:", answers: ["(A) admitted only if elicited from the expert witness on cross-examination.", "(B) admitted only if the false testimony is established by clear and convincing extrinsic evidence.", "(C) excluded, because it is impeachment on a collateral issue.", "(D) excluded, because it is improper character evidence."], correct: "A" },
  { id: 1062, category: "Evidence", question: "A drug manufacturer inadvertently turned over two documents reflecting communications between the manufacturer's president and its counsel regarding a drug's possible side effects. There were 23 other similar documents not turned over. Although the manufacturer learned of the disclosure during the discovery period, it did not seek return of the two documents until the day before trial. The woman claimed the manufacturer had waived attorney-client privilege as to all 25 documents. How should the court rule?", answers: ["(A) There was no waiver of the attorney-client privilege, because the disclosure was inadvertent.", "(B) There was a waiver of the attorney-client privilege regarding only the two disclosed documents.", "(C) There was a waiver of the attorney-client privilege regarding the disclosed documents as well as the other 23, because they all relate to the same subject matter.", "(D) There was a waiver of the attorney-client privilege for all 25 documents if the state law that supplies the rule of decision would support such a result."], correct: "B" },
  { id: 1063, category: "Evidence", question: "A plaintiff's first witness testified that, although she did not see the accident, she heard her friend say just before the crash, \"Look at the crazy way [the defendant] is driving!\" The defendant offers evidence to impeach the witness's friend by asking the witness, \"Isn't it true that your friend beat up the defendant just the day before the collision?\" The question is:", answers: ["(A) proper, because it tends to show the possible bias of the witness's friend against the defendant.", "(B) proper, because it tends to show the character of the witness's friend.", "(C) improper, because the witness's friend has no opportunity to explain or deny.", "(D) improper, because impeachment cannot properly be by specific instances."], correct: "A" },
  { id: 1064, category: "Evidence", question: "A defendant is on trial for nighttime breaking and entering of a warehouse. The warehouse owner had set up a camera to take infrared pictures of intruders. After an expert establishes the reliability of infrared photography, the prosecutor offers the authenticated infrared picture of the intruder to show similarities to the defendant. The photograph is:", answers: ["(A) admissible, provided an expert witness points out to the jury the similarities between the person in the photograph and the defendant.", "(B) admissible, allowing the jury to compare the person in the photograph and the defendant.", "(C) inadmissible, because there was no eyewitness to the scene available to authenticate the photograph.", "(D) inadmissible, because infrared photography deprives a defendant of the right to confront witnesses."], correct: "B" },
  { id: 1065, category: "Evidence", question: "A plaintiff sued a factory owner alleging a toxin caused the plaintiff to suffer a respiratory disease. The plaintiff's expert based her opinion on several studies about another substance similar to the toxin, showing that prolonged exposure to high doses can cause the same respiratory disease. On cross-examination, the company elicits an admission that the expert did not consider two recent clinical studies concluding there was no connection between the toxin and any respiratory disease. Should the court allow the plaintiff's expert to testify at trial?", answers: ["(A) No, because the expert is relying on studies that she read for purposes of preparing her testimony in this litigation.", "(B) No, because the plaintiff has failed to show by a preponderance of the evidence that the expert based her opinion on sufficient facts and data and that she employed a reliable methodology.", "(C) Yes, because the company has not met its burden of showing that the expert's opinion is unreliable.", "(D) Yes, because the sufficiency of an expert's basis for an opinion and the reliability of an expert's methodology are questions of weight for the jury."], correct: "B" },
  { id: 1066, category: "Evidence", question: "During a plaintiff's hospital stay, a staff physician examined the plaintiff's X rays and said, \"You have a fracture of two vertebrae, C4 and C5.\" An intern accompanying the physician on her rounds immediately wrote the diagnosis on the plaintiff's hospital record. At trial, the hospital records custodian testified that the plaintiff's hospital record was made and kept in the ordinary course of the hospital's business. The entry reporting the physician's diagnosis is:", answers: ["(A) inadmissible, because no foundation has been laid for the physician's competence as an expert.", "(B) inadmissible, because the physician's opinion is based upon data that are not in evidence.", "(C) admissible as a statement of then-existing physical condition.", "(D) admissible as a record of regularly conducted business activity."], correct: "D" },
  { id: 1067, category: "Evidence", question: "At a defendant's trial for sale of drugs, the government called a witness to testify, but the witness refused to answer any questions about the defendant and was held in contempt. The government then calls an officer to testify that, when the witness was arrested for possession of drugs and offered leniency if he would identify his source, the witness had named the defendant as his source. The testimony offered concerning the witness's identification of the defendant is:", answers: ["(A) admissible as a prior inconsistent statement by the witness.", "(B) admissible as an identification of the defendant by the witness after having perceived him.", "(C) inadmissible, because it is hearsay not within any exception.", "(D) inadmissible, because the witness was not confronted with the statement while on the stand."], correct: "C" },
  { id: 1068, category: "Evidence", question: "A company sued its former vice president for return of $230,000 that had been embezzled. Called as an adverse witness, the former vice-president testified that his annual salary had been $75,000, and he denied the embezzlement. The company calls a banker to show that, during the two-year period, the former vice-president had deposited $250,000 in his bank account. The witness's testimony is:", answers: ["(A) admissible as circumstantial evidence of the former vice-president's guilt.", "(B) admissible to impeach the former vice-president.", "(C) inadmissible, because its prejudicial effect substantially outweighs its probative value.", "(D) inadmissible, because the deposits could have come from legitimate sources."], correct: "A" },
  { id: 1069, category: "Evidence", question: "A pedestrian died from injuries caused when a car struck him. At trial, the executor calls a nurse to testify that two days after the accident, the pedestrian said, \"The car that hit me ran the red light.\" Fifteen minutes thereafter, the pedestrian died. The executor offers to the court a doctor's affidavit that the doctor was the intern on duty the day of the pedestrian's death and that several times that day the pedestrian had said that he knew he was about to die. Is the affidavit properly considered by the court in ruling on the admissibility of the pedestrian's statement?", answers: ["(A) No, because it is hearsay not within any exception.", "(B) No, because it is irrelevant since dying declarations cannot be used except in prosecutions for homicide.", "(C) Yes, because, though hearsay, it is a statement of then-existing mental condition.", "(D) Yes, because the judge may consider hearsay in ruling on preliminary questions."], correct: "D" },
  { id: 1070, category: "Evidence", question: "At a defendant's murder trial, the defendant calls a witness to testify that the defendant has a reputation in their community as a peaceable and truthful person. The prosecutor objects on the ground that the witness's testimony would constitute improper character evidence. The court should:", answers: ["(A) admit the testimony as to peaceableness, but exclude the testimony as to truthfulness.", "(B) admit the testimony as to truthfulness, but exclude the testimony as to peaceableness.", "(C) admit the testimony as to both character traits.", "(D) exclude the testimony as to both character traits."], correct: "A" },
];


const TORTS_QUESTIONS = [
 { id: 3001, category: "Torts", question: "A homeowner was injured when an automatic cutoff switch failed to function on a snowblower he was using. The cutoff switch had functioned well for a year after he purchased the snowblower but failed after the machine had been improperly repaired by a mechanic. The snowblower's operating manual contained a clear and prominent warning against making the very alteration to the switch mechanism that was made by the mechanic. The mechanic, however, did not have a manual available when he repaired the snowblower.\n\nDoes the homeowner have a viable claim against the manufacturer of the snowblower for damages?", answers: ["(A) No, because the homeowner was contributorily negligent in failing to furnish the snowblower's manual to the mechanic.", "(B) No, because the injury resulted from a substantial alteration of the snowblower by a third party.", "(C) Yes, because a defect in the snowblower caused the homeowner's injury.", "(D) Yes, because the manufacturer should have made the manual available to repair personnel."], correct: "B" },
 { id: 3002, category: "Torts", question: "A 13-year-old girl was operating a high-speed motorboat. The boat was towing a 9-year-old boy in an inner tube tied to the rear of the motorboat by a rope. The rope became tangled around the boy's foot, causing him to suffer severe injuries.\n\nIn a suit brought on the boy's behalf against the girl, the boy has introduced uncontroverted evidence that the girl drove carelessly in such a way as to entangle the boy in the rope.\n\nIs the boy likely to prevail?", answers: ["(A) No, because the boy assumed the risk.", "(B) No, because the girl was too young to be expected to appreciate and avoid the risk she exposed the boy to.", "(C) Yes, because children of the girl's age should have the capacity to operate motorboats.", "(D) Yes, because the girl will be held to an adult standard of care."], correct: "D" },
 { id: 3003, category: "Torts", question: "A seller sold his boat to a buyer. During negotiations, the buyer said that he planned to sail the boat on the open seas. The seller told the buyer that the boat was seaworthy and had never sustained any significant damage. In fact, the hull of the boat had been badly damaged when the seller had run the boat aground. The seller had then done a cosmetic repair to the hull rather than a structural repair.\n\nThe buyer relied on the seller's representations and paid a fair price for a boat in good repair, only to discover after the sale was completed that the hull was in fact badly damaged and in a dangerous condition. The seller has refused to refund any of the buyer's money, and the buyer is contemplating suing the seller.\n\nUnder what theory would the buyer be most likely to recover?", answers: ["(A) Fraud.", "(B) Intentional endangerment.", "(C) Negligent misrepresentation.", "(D) Strict products liability."], correct: "A" },
 { id: 3004, category: "Torts", question: "A farmer owns a large farm on which he allows his friends to hunt during quail-hunting season. He does not provide his friends with any instructions about gun safety. The neighbor who owns property adjacent to the farm knows of the friends' use of the property during the hunting season. One day during the hunting season, without the farmer's knowledge or permission, the neighbor took a shortcut across the farm to visit an acquaintance. The neighbor was wounded by a shot fired by one of the farmer's friends, who was shooting at quail and carelessly failed to see the neighbor.\n\nTraditional rules of landowners' and occupiers' liability apply.\n\nIn an action by the neighbor against the farmer to recover for the injuries, will the neighbor be likely to prevail?", answers: ["(A) No, because the farmer is not responsible for his friends' conduct.", "(B) No, because the neighbor was trespassing.", "(C) Yes, because the careless friend was permitted to hunt without safety training.", "(D) Yes, because the use of firearms is an abnormally dangerous activity."], correct: "B" },
 { id: 3005, category: "Torts", question: "A 15-year-old boy was killed during a gang fight. Two days after his funeral, the boy's mother saw a television program about gang violence and was shocked to see video of herself weeping over the boy's body. The video had been shot by the television reporting team while the boy's body was still lying on a public street. The mother suffered severe emotional distress as a result of seeing the video.\n\nIf the mother sues the television station for invasion of her privacy and that of her son, will the mother be likely to prevail?", answers: ["(A) No, because a person has no right to privacy after his or her death.", "(B) No, because the street was open to the public and the subject was newsworthy.", "(C) Yes, because the mother did not give permission to have the video used in the program.", "(D) Yes, because the mother suffered severe emotional distress as a result of viewing the video."], correct: "B" },
 { id: 3006, category: "Torts", question: "A patient in a hospital was placed in a wheelchair with his broken leg extended straight out in front of him. As a nurse employed by the hospital was pushing the wheelchair through a set of automatic doors at a normal pace, the doors closed on the patient's foot, injuring it. The nurse attempted to pull the wheelchair back through the doors. This action caused the doors to close more tightly on the patient's foot, injuring it further.\n\nThe patient sued the hospital, alleging improper maintenance of the doors. The patient has produced no evidence of specific conduct or neglect on the part of the hospital that would have caused the automatic doors to malfunction. The hospital has moved for summary judgment.\n\nShould the court grant the hospital's motion?", answers: ["(A) No, because a jury could find that there was a latent defect in the doors.", "(B) No, because a jury could find the hospital liable for negligence based on res ipsa loquitur.", "(C) Yes, because proof of an accident, by itself, does not establish that an injured person was a victim of negligence.", "(D) Yes, because the nurse's action was a superseding cause of the injury."], correct: "B" },
 { id: 3007, category: "Torts", question: "In a tavern, an intoxicated woman threatened to slash a man with a broken beer bottle. Another customer, who had not been threatened by the woman, forcefully grabbed the woman and locked her in the tavern's storeroom until the police could arrive. In the process, although the customer used reasonable force, the customer badly sprained the woman's wrist.\n\nIs the woman likely to recover in an action against the customer?", answers: ["(A) No, because the customer's conduct was privileged as a defense of others.", "(B) Yes, based on battery only.", "(C) Yes, based on false imprisonment only.", "(D) Yes, based on both battery and false imprisonment."], correct: "A" },
 { id: 3008, category: "Torts", question: "A longshoreman fell to his death through an open hatch on the deck of a ship. The longshoreman was an employee of a company that had contracted with the ship's owner to load and unload the ship. The fall occurred at night, when loading work was over for the day, and there was no reason for the longshoreman to have been near the hatch.\n\nA negligence action was filed against the ship's owner for the death of the longshoreman. In that action, the owner has moved for summary judgment and has provided unrebutted evidence that it is customary for the crews of ships to open the hatches for ventilation after the longshoremen have left the ships.\n\nHow should the court respond to the motion?", answers: ["(A) Deny the motion and submit the case to the jury with instructions that the custom is relevant but not conclusive on the issue of negligence.", "(B) Deny the motion and submit the case to the jury with instructions that the ship's owner should win if the longshoreman was improperly near the hatch.", "(C) Deny the motion, because the probability of serious injury caused by falling down an open hatch clearly outweighs the burden of keeping the hatch closed.", "(D) Grant the motion, because the custom should be considered conclusive on the issue of negligence."], correct: "A" },
 { id: 3009, category: "Torts", question: "A chemical company's plant was located in a residential community. The manufacturing process used at the plant generated a toxic chemical as a byproduct. The chemical was stored in a state-of-the-art tank on the site before being moved to an off-site disposal facility. The on-site storage arrangement conformed to the requirements of reasonable care and to the applicable government regulations. However, the storage of the toxic chemical created a foreseeable and highly significant risk of physical harm even when reasonable care was exercised.\n\nDespite the chemical company's proper use and care of the storage tank, toxic fumes escaped from the tank and made residents of the area seriously ill.\n\nNo state or federal statutes address the issue of the company's liability.\n\nIn an action by one of the affected residents against the chemical company, will the resident be likely to prevail?", answers: ["(A) No, because the chemical company conformed to the requirements of reasonable care and to the applicable government regulations.", "(B) No, because the chemical company used a state-of-the-art storage tank.", "(C) Yes, because the chemical company is strictly liable in tort for any harm caused by the toxic chemicals it produced.", "(D) Yes, because the storage of toxic chemicals in a residential community created a highly significant risk of physical harm even when reasonable care was exercised."], correct: "D" },
 { id: 3010, category: "Torts", question: "A pedestrian was injured when hit by a chair that was thrown from an upper-story hotel window. The pedestrian sued the occupants of all the rooms from which the chair might have been thrown.\n\nAt trial, the pedestrian has been unable to offer any evidence as to the exact room from which the chair was thrown.\n\nThe defendants have filed a motion for a directed verdict.\n\nShould the court grant the motion?", answers: ["(A) No, because it is unreasonable to expect the pedestrian to prove which of the defendants caused the harm.", "(B) No, because of the doctrine of alternative liability.", "(C) Yes, because a plaintiff always has the burden to prove that a particular defendant's conduct was the factual cause of the plaintiff's physical harm.", "(D) Yes, because the pedestrian has failed to offer evidence that the defendants jointly engaged in tortious conduct."], correct: "D" },
 { id: 3011, category: "Torts", question: "A security guard, dressed in plain clothes, was working for a discount store when a customer got into a heated argument with a cashier over the store's refund policy. Without identifying himself as a security guard, the security guard suddenly grabbed the customer's arm. The customer attempted to push the security guard away, and the security guard knocked the customer to the floor, causing injuries.\n\nThe customer sued the discount store for battery on a theory of vicarious liability for the injuries caused by the security guard.\n\nThe store filed an answer to the customer's complaint, asserting the affirmative defense of contributory negligence. The customer has moved to strike the affirmative defense.\n\nTraditional rules of contributory negligence apply.\n\nShould the trial court grant the customer's motion?", answers: ["(A) No, because contributory negligence is an affirmative defense to a cause of action based on vicarious liability.", "(B) No, because the customer should have known that his argument with the cashier might provoke an action by a security guard.", "(C) Yes, because contributory negligence is not a defense to battery.", "(D) Yes, because the customer did not know that he was pushing away someone who was employed as a security guard."], correct: "C" },
 { id: 3012, category: "Torts", question: "After her husband died in a hospital, a widow directed the hospital to send her husband's body to a funeral home for burial. The hospital negligently misidentified the husband's body and sent it to be cremated. When she was informed of the hospital's mistake, the widow suffered serious emotional distress. She has sued the hospital.\n\nIs the hospital likely to be held liable to the widow?", answers: ["(A) No, because the widow did not witness the cremation.", "(B) No, because the widow was never in any danger of bodily harm.", "(C) Yes, because hospitals are strictly liable if they do not properly dispose of corpses.", "(D) Yes, because the negligent handling of the husband's body was especially likely to cause his widow serious emotional distress."], correct: "D" },
 { id: 3013, category: "Torts", question: "A hot-air balloon touring company operated near a golf course. The company's property was separated from the golf course by a fence on which the company had posted signs warning people not to enter the property because of the dangers of balloons landing.\n\nA golfer on the golf course hit an errant shot onto the company's property, ignored the warning signs, and jumped over the fence to retrieve her golf ball. At about the same time, one of the company's balloons experienced mechanical problems and had to make an emergency landing to avoid crashing. The balloon, which was out of control when it landed, struck the golfer and injured her.\n\nThe jurisdiction has decided that hot-air ballooning is an abnormally dangerous activity.\n\nIn an action by the golfer against the company, does the company have any affirmative defenses?", answers: ["(A) No, because the balloon was out of control when it struck the golfer.", "(B) No, because the company was engaged in an abnormally dangerous activity.", "(C) Yes, because the balloon landed to avoid crashing.", "(D) Yes, because the golfer assumed the risk by coming onto the company's property."], correct: "D" },
 { id: 3014, category: "Torts", question: "A homeowner resides downhill from a metal fabrication facility. She has sued both the owner of the facility and the supplier of a solvent used at the facility. She contends that contaminants, consisting mostly of the solvent, were released into the ground at the facility and have migrated and continue to migrate to her property, contaminating the soil, the groundwater, and her well. She alleges various acts of negligence on the part of the facility owner in causing the release of the contaminants into the ground. She also alleges that employees of the solvent supplier were negligent in frequently spilling some of the solvent onto the ground while filling a rooftop tank at the facility.\n\nThe solvent supplier has moved for summary judgment, arguing that if there was any contamination, the facility owner and the supplier independently contributed indeterminate amounts to the contamination and that therefore the homeowner cannot show how much damage each has inflicted on her.\n\nThere is no evidence that the facility owner and the solvent supplier acted in concert.\n\nShould the court grant the summary judgment motion?", answers: ["(A) No, because concurrent tortfeasors are jointly and severally liable for an indivisible injury.", "(B) No, because the solvent supplier is vicariously liable for damage inflicted by the facility owner.", "(C) Yes, because there is no basis for allocating damages against the solvent supplier.", "(D) Yes, because there is no evidence that the facility owner and the solvent supplier acted in concert."], correct: "A" },
 { id: 3015, category: "Torts", question: "A fumigation company was hired to eliminate pests in one of two buildings in a condominium complex that shared a common wall. The owners of the complex told the fumigation company that the common wall separating the infested building from the uninfested building was an impenetrable fire wall. The fumigation company did its own thorough inspection and determined that the buildings were indeed completely separated by the wall. Residents of the condominium units in the building that was to be sprayed were told to evacuate, but the residents of the uninfested building were told that they could remain while the other building was treated.\n\nDuring and shortly after the fumigation, in which a highly toxic chemical was used, many residents of the uninfested building became sick. It was determined that their illnesses were caused by the fumigation chemical.\n\nIn fact, there was a hole in the fire wall separating the two buildings, but because it could only be observed from a specific position in the crawl space underneath the floor of the uninfested building, it had not been discovered by either the fumigation company or any previous building inspector.\n\nAre the residents of the uninfested building likely to prevail in a tort action against the fumigation company?", answers: ["(A) No, because the condominium complex owners were responsible for accurately conveying the condition of their buildings.", "(B) No, because the fumigation company exercised a high level of care.", "(C) Yes, because the fumigation company can be held strictly liable for its activity.", "(D) Yes, because the fumigation company put a dangerous product into the stream of commerce."], correct: "C" },
 { id: 3016, category: "Torts", question: "A homeowner was using a six-foot stepladder to clean the furnace in his home. The homeowner broke his arm when he slipped and fell from the ladder. The furnace had no warnings or instructions on how it was to be cleaned.\n\nIn a suit by the homeowner against the manufacturer of the furnace to recover for his injury, is the homeowner likely to prevail?", answers: ["(A) No, because the danger of falling from a ladder is obvious.", "(B) No, because the homeowner should have hired a professional to clean the furnace.", "(C) Yes, because the furnace did not have a ladder attached to it for cleaning purposes.", "(D) Yes, because the lack of warnings or instructions for how to clean the furnace made the furnace defective."], correct: "A" },
 { id: 3017, category: "Torts", question: "A college student was asleep in his bed in a college dormitory when his roommate, in a drunken fury, entered their room intending to attack the student with an ice pick while he slept. Fortunately, the phone rang and awakened the student. The roommate retreated quickly and threw the ice pick under his own bed in the same room. The next day, the student heard from friends about the roommate's murderous plans and later found the ice pick under the roommate's bed. Even though the college expelled his roommate, the student remained extremely upset and afraid to sleep.\n\nIn a suit against the roommate for assault, will the student prevail?", answers: ["(A) No, because the roommate did not touch the student.", "(B) No, because the student was not awake when the roommate entered the room and was unaware until later that the roommate was intending to attack him.", "(C) Yes, because it was reasonable for the student to feel afraid of sleeping in his room afterward.", "(D) Yes, because the roommate intended to inflict serious harm."], correct: "B" },
 { id: 3018, category: "Torts", question: "When a tire of a motorist's car suffered a blowout, the car rolled over and the motorist was badly injured. Vehicles made by the manufacturer of the motorist's car have been found to be negligently designed, making them dangerously prone to rolling over when they suffer blowouts. A truck driver who was driving behind the motorist when the accident occurred stopped to help. Rescue vehicles promptly arrived, and the truck driver walked along the side of the road to return to his truck. As he approached his truck, he was struck and injured by a speeding car. The truck driver has sued the manufacturer of the injured motorist's car.\n\nIs the truck driver likely to prevail in a suit against the car manufacturer?", answers: ["(A) No, because the car manufacturer's negligence was not the proximate cause of the truck driver's injuries.", "(B) No, because the truck driver assumed the risk of injury when he undertook to help the motorist.", "(C) Yes, because it is foreseeable that injuries can result from rollovers.", "(D) Yes, because the car manufacturer's negligence caused the dangerous situation that invited the rescue by the truck driver."], correct: "D" },
 { id: 3019, category: "Torts", question: "A gas company built a large refining facility that conformed to zoning requirements on land near a landowner's property.\n\nThe landowner had his own home and a mini-golf business on his property.\n\nIn a nuisance action against the gas company, the landowner established that the refinery emitted fumes that made many people feel quite sick when they were outside on his property for longer than a few minutes. The landowner's mini-golf business had greatly declined as a consequence, and the value of his property had gone down markedly.\n\nIs the landowner likely to prevail?", answers: ["(A) No, because the landowner has offered no evidence demonstrating that the gas company was negligent.", "(B) No, because the refinery conforms to the zoning requirements.", "(C) Yes, because the refinery has substantially and unreasonably interfered with the landowner's use and enjoyment of his property.", "(D) Yes, because the value of the landowner's property has declined."], correct: "C" },
 { id: 3020, category: "Torts", question: "A fire that started in the defendant's warehouse spread to the plaintiff's adjacent warehouse. The defendant did not intentionally start the fire, and the plaintiff can produce no evidence as to how the fire started. However, the defendant had failed to install a sprinkler system, which was required by a criminal statute. The plaintiff can produce evidence that had the sprinkler system been installed, it could have extinguished the fire before it spread.\n\nIn an action by the plaintiff against the defendant to recover for the fire damage, is it possible for the plaintiff to prevail?", answers: ["(A) No, because the statute provides only for criminal penalties.", "(B) No, because there is no evidence that the defendant negligently caused the fire to start.", "(C) Yes, because a landowner is strictly liable for harm to others caused by the spread of fire from his premises under the doctrine of Rylands v. Fletcher.", "(D) Yes, because the plaintiff was harmed as a result of the defendant's violation of a statute that was meant to protect against this type of occurrence."], correct: "D" },
 { id: 3021, category: "Torts", question: "A schizophrenic patient who was institutionalized in a psychiatric facility pushed a nurse down a stairwell at the facility. The nurse, a paid employee of the facility who was trained to care for schizophrenic patients, was injured. The patient is an indigent whose care is paid for by the government.\n\nThe jurisdiction generally follows the rule that a person with a mental deficiency is held to the standard of a reasonable person. In a negligence action brought by the nurse against the patient, the patient's lawyer will argue that the patient should not be held responsible for the nurse's injury.\n\nWhich of the following facts will be LEAST helpful to the patient's lawyer's argument?", answers: ["(A) The nurse was a professional caregiver.", "(B) The nurse was trained to care for patients with schizophrenia.", "(C) At the time she pushed the nurse, the patient thought she was being attacked by an elephant.", "(D) The patient is an indigent whose care is paid for by the government."], correct: "D" },
 { id: 3022, category: "Torts", question: "A farmer kept antiques in an uninhabited farmhouse on his property. The farmhouse had been broken into several times in the past, and some of the farmer's goods had been stolen. Instead of posting \"No Trespassing\" signs, the farmer decided to install an alarm system to deter intruders.\n\nWhile the farmer was in the farmhouse installing the alarm system, he heard a window open in the adjoining room. The farmer crept very quietly to the door of the room, threw the door open, and found an intruder, a young child. The farmer immediately struck the child, a ten-year-old girl, very hard in the face, breaking her nose.\n\nIn an action on behalf of the child against the farmer to recover for the injury to her nose, is the child likely to prevail?", answers: ["(A) No, because the farmer did not use deadly force.", "(B) No, because the farmer had probable cause to believe that the child was a thief.", "(C) Yes, because the farmer should have posted a \"No Trespassing\" sign.", "(D) Yes, because the farmer used excessive force."], correct: "D" },
 { id: 3023, category: "Torts", question: "A mining company that operated a copper mine in a remote location kept dynamite in a storage facility at the mine. The storage facility was designed and operated in conformity with state-of-the-art safety standards. In the jurisdiction, the storage of dynamite is deemed an abnormally dangerous activity.\n\nDynamite that was stored in the mining company's storage facility and that had been manufactured by an explosives manufacturer exploded due to an unknown cause. The explosion injured a state employee who was at the mine performing a safety audit. The employee brought an action in strict liability against the mining company.\n\nWhat would be the mining company's best defense?", answers: ["(A) The mine was in a remote location.", "(B) The mining company did not manufacture the dynamite.", "(C) The state employee assumed the risk of injury inherent in the job.", "(D) The storage facility conformed to state-of-the-art safety standards."], correct: "C" },
 { id: 3024, category: "Torts", question: "A driver negligently ran into a pedestrian who was walking along a road. The pedestrian sustained an injury to his knee, causing it to buckle from time to time. Several months later, the pedestrian sustained an injury to his shoulder when his knee buckled, causing him to fall down a flight of stairs. The pedestrian then brought an action against the driver for the injuries to his knee and shoulder.\n\nIn his action against the driver, for which of his injuries may the pedestrian recover damages?", answers: ["(A) For the injuries to his knee and shoulder, because the driver takes the victim as he finds him.", "(B) For the injuries to his knee and shoulder, if the jury finds that the pedestrian's fall down a flight of stairs was a normal consequence of his original injury.", "(C) For the injury to his knee only, because the injury to the pedestrian's shoulder is separable.", "(D) For the injury to his knee only, if the jury finds that the driver could not have foreseen that his negligent driving would cause the pedestrian to fall down a flight of stairs."], correct: "B" },
 { id: 3025, category: "Torts", question: "A rancher and his neighbor were involved in a boundary dispute. In order to resolve their differences, each drove his truck to an open pasture area on his land where the two properties were separated by a fence. The rancher was accompanied by four friends, and the neighbor was alone.\n\nThe neighbor got out of his truck and walked toward the fence. The rancher got out but simply stood by his truck. When the neighbor came over the fence, the rancher shot him, inflicting serious injury.\n\nIn a battery action brought by the neighbor against the rancher, the rancher testified that he actually thought his neighbor was armed, although he could point to nothing that would have reasonably justified this belief.\n\nIs the neighbor likely to prevail?", answers: ["(A) No, because the rancher was standing on his own property and had no obligation to retreat.", "(B) No, because the rancher suspected that the neighbor was armed.", "(C) Yes, because deadly force is never appropriate in a property dispute.", "(D) Yes, because it was unreasonable for the rancher to consider the use of a gun necessary for self-defense."], correct: "D" },
 { id: 3026, category: "Torts", question: "A driver was traveling along a highway during an unusually heavy rainstorm when the roadway began to flood. To protect his car from water damage, the driver pulled his car up a steep, unmarked driveway abutting the highway that led to a homeowner's residence. The driver left his car parked in the driveway and walked home, intending to return when the floodwater had subsided. Shortly after the driver started to walk home, the homeowner carefully rolled the car back down his driveway and parked it on the highway shoulder. The floodwater continued to rise and caused damage to the driver's car.\n\nIf the driver sues the homeowner to recover for damage to the car, is the driver likely to prevail?", answers: ["(A) Yes, because the driver was privileged to park his car on the homeowner's property.", "(B) Yes, because there were no \"no trespassing\" signs posted.", "(C) No, because the driver intentionally drove his car onto the homeowner's property.", "(D) No, because the homeowner was privileged to remove the car from his property."], correct: "A" },
 { id: 3027, category: "Torts", question: "A hotel employed a carefully selected independent contractor to rebuild its swimming pool. The hotel continued to operate while the pool was being rebuilt. The contract between the hotel and the contractor required the contractor to indemnify the hotel for any liability arising from the contractor's negligent acts. A guest of the hotel fell into the excavation, which the contractor had negligently left unguarded.\n\nIn an action by the guest against the hotel to recover for his injuries, what would be the most likely outcome?", answers: ["(A) Liability, because the hotel had a non-delegable duty to the guest to keep a safe premises.", "(B) Liability, because the contract between the hotel and the contractor required the contractor to indemnify the hotel for any liability arising from the contractor's negligent acts.", "(C) No liability, because the contractor was the actively negligent party.", "(D) No liability, because the hotel exercised reasonable care in employing the contractor."], correct: "A" },
 { id: 3028, category: "Torts", question: "A newspaper published an editorial in which an editor asserted that a candidate for high political office was a user of illegal drugs. The accusation was untrue. The editor acted unreasonably in not investigating the accusation before publishing it; however, the editor honestly believed that the accusation was true.\n\nThe candidate sued the editor for defamation.\n\nIs the candidate entitled to recover?", answers: ["(A) No, because the accusation appeared in an editorial and was, therefore, merely an opinion.", "(B) No, because the editor honestly believed that the accusation was true.", "(C) Yes, because calling someone an illegal drug user is defamatory per se.", "(D) Yes, because the accusation was false and was injurious to the candidate's reputation."], correct: "B" },
 { id: 3029, category: "Torts", question: "An elderly neighbor hired a 17-year-old boy with a reputation for reckless driving to drive the neighbor on errands once a week. One day the teenager, driving the neighbor's car, took the neighbor to the grocery store. While the neighbor was in the store, the teenager drove out of the parking lot and headed for a party on the other side of town.\n\nWhile on his way to the party, the teenager negligently turned in front of a moving car and caused a collision. The other driver was injured in the collision.\n\nThe injured driver has brought an action for damages against the neighbor, based on negligent entrustment, and against the teenager.\n\nThe jury has found that the injured driver's damages were $100,000, that the injured driver was 10 percent at fault, that the teenager was 60 percent at fault, and that the neighbor was 30 percent at fault for entrusting his car to the teenager.\n\nBased on these damage and responsibility amounts, what is the maximum that the injured driver could recover from the neighbor?", answers: ["(A) $100,000.", "(B) $90,000.", "(C) $60,000.", "(D) $30,000."], correct: "B" },
 { id: 3030, category: "Torts", question: "A patient received anesthesia while giving birth. Upon awakening from the anesthesia, she discovered a severe burn on the inner portion of her right knee. The patient has brought a medical malpractice action in which she has joined all of the physicians and nurses who exercised control over her person, the delivery room, the medical procedures, and the equipment used during the period in which she was unconscious.\n\nThe defendants have jointly moved for summary judgment. The patient has produced affidavits that establish that the applicable professional standard of care was violated.\n\nWhat would be the patient's best argument against the motion?", answers: ["(A) At least one of the defendants had control over whatever agency or instrumentality caused the patient's injury.", "(B) The defendants were acting in concert.", "(C) The patient has produced affidavits that establish that the applicable professional standard of care was violated.", "(D) The patient was in no way responsible for her injury."], correct: "A" },
 { id: 3031, category: "Torts", question: "A customer pledged a stock certificate to a bank as security for a loan. A year later, when the customer fully repaid the loan, the bank refused the customer's demand to return the stock certificate because the officer dealing with the loan had the mistaken belief that there was still a balance due. No one at the bank reviewed the records until two months later, at which time the error was discovered. The bank then offered to return the stock certificate. However, the customer refused to accept it.\n\nAt the time the customer pledged the certificate, the shares were worth $10,000; at the time the customer repaid the loan, the shares were worth $20,000; and at the time the bank offered to return the certificate, the shares were worth $5,000.\n\nIf the customer brings an action against the bank based on conversion, how much, if anything, should the customer recover?", answers: ["(A) Nothing, because the bank lawfully came into possession of the certificate.", "(B) $5,000, because that was the value of the shares when the customer refused to accept the certificate back.", "(C) $10,000, because that was the value of the shares when the bank came into possession of the certificate.", "(D) $20,000, because that was the value of the shares when the customer was entitled to the return of the certificate."], correct: "D" },
 { id: 3032, category: "Torts", question: "A man rented a car from a car rental agency. Unbeknownst to the rental agency, the car had a bomb hidden in it at the time of the rental. The bomb exploded an hour later, injuring the man.\n\nImmediately prior to renting the car to the man, the rental agency had carefully inspected the car to be sure it was in sound operating condition. The rental agency did not inspect for hidden explosive devices, but such an inspection for explosives would have revealed the bomb.\n\nThere had been no previous incidents of persons hiding bombs in rental cars.\n\nIn a negligence action by the man against the car rental agency, is the man likely to prevail?", answers: ["(A) No, because the rental agency could not have reasonably foreseen the likelihood of someone placing a bomb in the car it was about to rent to the man.", "(B) No, because the rental agency did not hide the bomb in the car.", "(C) Yes, because an inspection for explosive devices would have revealed the bomb.", "(D) Yes, because the bomb made the car abnormally dangerous."], correct: "A" },
 { id: 3033, category: "Torts", question: "In an action by a man against a pharmacy, the man offered only the following evidence:\n\nThe man took a clearly written prescription to a pharmacy. The pharmacy's employee filled the prescription by providing pills with 30 milligrams of the active ingredient instead of 20 milligrams, as was prescribed. Shortly after taking the pills as directed, the man, who had no previous history of heart problems, suffered a heart attack. Overdoses of the active ingredient had previously been associated with heart problems.\n\nDoes the man have a valid claim against the pharmacy?", answers: ["(A) No, because pharmacies are not strictly liable for injuries caused by incorrectly filled prescriptions.", "(B) No, because the man offered no specific proof as to the pharmacy's negligence.", "(C) Yes, because a jury could reasonably conclude that the man would not have suffered a heart attack had the pharmacy provided the correct dosage.", "(D) Yes, because by providing the 30-milligram pills rather than the 20-milligram pills, the pharmacy sold the man a defective product."], correct: "C" },
 { id: 3034, category: "Torts", question: "A traveler was flying on a commercial aircraft owned and operated by an airline. The aircraft crashed into a mountain, killing everyone on board. The flying weather was good.\n\nThe traveler's legal representative brought a wrongful death action against the airline. At trial, the legal representative offered no expert or other testimony as to the cause of the crash.\n\nOn the airline's motion to dismiss at the conclusion of the legal representative's case, the court should", answers: ["(A) grant the motion, because the legal representative has offered no evidence as to the cause of the crash.", "(B) grant the motion, because the legal representative has failed to offer evidence negating the possibility that the crash may have been caused by mechanical failure that the airline could not have prevented.", "(C) deny the motion, because the jury may infer that the aircraft crashed due to the airline's negligence.", "(D) deny the motion, because in the circumstances common carriers are strictly liable."], correct: "C" },
 { id: 3035, category: "Torts", question: "A sporting goods shop was burglarized by an escaped inmate from a nearby prison. The inmate stole a rifle and bullets from a locked cabinet. The burglar alarm at the sporting goods shop did not go off because the shop owner had negligently forgotten to activate the alarm's motion detector.\n\nShortly thereafter, the inmate used the rifle and ammunition stolen from the shop in a shooting spree that caused injury to a victim.\n\nIf the victim sues the shop owner for the injury she suffered, will the victim prevail?", answers: ["(A) Yes, if the victim's injury would have been prevented had the motion detector been activated.", "(B) Yes, because the owner was negligent in failing to activate the motion detector.", "(C) No, because the storage and sale of firearms and ammunition is not an abnormally dangerous activity.", "(D) No, unless there is evidence of circumstances suggesting a high risk of theft and criminal use of firearms stocked by the shop owner."], correct: "D" },
 { id: 3036, category: "Torts", question: "Because of a farmer's default on his loan, the bank foreclosed on the farm and equipment that secured the loan. Among the items sold at the resulting auction was a new tractor recently delivered to the farmer by the retailer. Shortly after purchasing the tractor at the auction, the new owner was negligently operating the tractor on a hill when it rolled over due to a defect in the tractor's design. He was injured as a result. The new owner sued the auctioneer, alleging strict liability in tort. The jurisdiction has not adopted a comparative fault rule in strict liability cases.\n\nIn this suit, the result should be for the", answers: ["(A) plaintiff, because the defendant sold a defective product that injured the plaintiff.", "(B) plaintiff, if the defendant failed to inspect the tractor for defects prior to sale.", "(C) defendant, because he should not be considered a \"seller\" for purposes of strict liability in tort.", "(D) defendant, because the accident was caused in part by the new owner's negligence."], correct: "C" },
 { id: 3037, category: "Torts", question: "A homeowner owns a house on a lake, and a neighbor owns a house across a driveway from the homeowner's property. The neighbor's house sits on a hill and the neighbor can see the lake from his living room window.\n\nThe homeowner and the neighbor got into an argument and the homeowner erected a large spotlight on his property that automatically comes on at dusk and goes off at sunrise. The only reason the homeowner installed the light was to annoy the neighbor. The glare from the light severely detracts from the neighbor's view of the lake. In a suit by the neighbor against the homeowner, will the neighbor prevail?", answers: ["(A) Yes, because the homeowner installed the light solely to annoy the neighbor.", "(B) Yes, if, and only if, the neighbor's property value is adversely affected.", "(C) No, because the neighbor's view of the lake is not always obstructed.", "(D) No, if the spotlight provides added security to the homeowner's property."], correct: "A" },
 { id: 3038, category: "Torts", question: "A driver was driving his car near a house when the homeowner's child darted into the street in front of the driver's car. As the driver swerved and braked his car to avoid hitting the child, the car skidded up into the homeowner's driveway and stopped just short of the homeowner, who was standing in the driveway and had witnessed the entire incident. The homeowner suffered serious emotional distress from witnessing the danger to his child and to himself. Neither the homeowner nor his property was physically harmed.\n\nIf the homeowner asserts a claim for damages against the driver, will the homeowner prevail?", answers: ["(A) Yes, because the driver's entry onto the homeowner's land was unauthorized.", "(B) Yes, because the homeowner suffered serious emotional distress by witnessing the danger to his child and to himself.", "(C) No, unless the driver was negligent.", "(D) No, unless the homeowner's child was exercising reasonable care."], correct: "C" },
 { id: 3039, category: "Torts", question: "A neighbor, who lived next door to another homeowner, went into the homeowner's garage without permission and borrowed the homeowner's chainsaw. The neighbor used the saw to clear broken branches from the trees on the neighbor's own property. After he had finished, the neighbor noticed several broken branches on the homeowner's trees that were in danger of falling on the homeowner's roof. While the neighbor was cutting the homeowner's branches, the saw broke.\n\nIn a suit for conversion by the homeowner against the neighbor, will the homeowner recover?", answers: ["(A) Yes, for the actual damage to the saw.", "(B) Yes, for the value of the saw before the neighbor borrowed it.", "(C) No, because when the saw broke the neighbor was using it to benefit the homeowner.", "(D) No, because the neighbor did not intend to keep the saw."], correct: "B" },
 { id: 3040, category: "Torts", question: "A landowner hired a tree specialist to cut down four trees, which he pointed out to the specialist before the specialist began work. Although the landowner reasonably believed that all the trees were on his property, three of the trees that were cut down were in fact on a neighbor's property.\n\nWho, if anyone, is liable to the landowner's neighbor for conversion?", answers: ["(A) Both the tree specialist and the landowner.", "(B) Neither the tree specialist nor the landowner.", "(C) The landowner only.", "(D) The tree specialist only."], correct: "A" },
 { id: 3041, category: "Torts", question: "A trucking company employed nine salaried dispatchers to ensure that its truck fleet operated according to schedule. Two years ago, as a cost-saving measure, the company reduced the number of dispatchers to six, and each of the remaining dispatchers had to work substantially longer hours.\n\nOne of the remaining dispatchers complained to his supervisor that the stress and fatigue associated with the new working conditions were too much for him to handle. The supervisor told the dispatcher that he should quit if he couldn't handle the increased hours.\n\nOver the next three months, the dispatcher continued to complain about the working conditions, to no effect. The dispatcher suffered severe emotional distress from the working conditions, but no physical injury. He eventually was hospitalized and had to miss several months of work as a result of the emotional distress.\n\nThe dispatcher sued the trucking company for negligence. The company has moved for summary judgment, based on the undisputed facts set out above. Assume that there is no applicable workers' compensation statute.\n\nHow should the court rule on the motion?", answers: ["(A) Deny the motion, because the jury must determine the extent of the emotional distress suffered by the dispatcher.", "(B) Deny the motion, because there is evidence from which a jury could reasonably conclude that the supervisor failed to act with ordinary care.", "(C) Grant the motion, because the dispatcher suffered no physical injury.", "(D) Grant the motion, because there is no evidence from which a jury could reasonably conclude that the supervisor acted carelessly with respect to the dispatcher's emotional well-being."], correct: "C" },
 { id: 3042, category: "Torts", question: "The warden of a state prison prohibits the photographing of the face of any prisoner without the prisoner's consent. A news photographer wanted to photograph a mobster, a notorious organized crime figure incarcerated at the state prison. To circumvent the warden's prohibition, the photographer flew over the prison exercise yard and photographed the mobster. Another prisoner, who was imprisoned for a technical violation of a regulatory statute, happened to be standing next to the mobster when the photograph was taken.\n\nWhen the picture appeared in the press, the prisoner suffered severe emotional distress because he believed that his business associates and friends would think he was consorting with gangsters. The prisoner suffered no physical harm as the result of his emotional distress. The prisoner brought an action against the photographer for intentional or reckless infliction of emotional distress.\n\nWhat is the best argument that the photographer can make in support of a motion for summary judgment?", answers: ["(A) No reasonable person could conclude that the photographer intended to photograph the prisoner.", "(B) The prisoner did not suffer any physical injury arising from the emotional distress.", "(C) As a news photographer, the photographer was privileged to take photographs that others could not.", "(D) No reasonable person could conclude that the photographer's conduct was extreme and outrageous as to the prisoner."], correct: "D" },
 { id: 3043, category: "Torts", question: "A passenger departed on an ocean liner knowing that it would be a rough voyage due to predicted storms. The ocean liner was not equipped with the type of lifeboats required by the applicable statute.\n\nThe passenger was swept overboard and drowned in a storm so heavy that even a lifeboat that conformed to the statute could not have been launched. In an action against the operator of the ocean liner brought by the passenger's representative, will the passenger's representative prevail?", answers: ["(A) Yes, because the ocean liner was not equipped with the statutorily required lifeboats.", "(B) Yes, because in these circumstances common carriers are strictly liable.", "(C) No, because the storm was so severe that it would have been impossible to launch a statutorily required lifeboat.", "(D) No, because the passenger assumed the risk by boarding the ocean liner knowing that it would be a rough voyage."], correct: "C" },
 { id: 3044, category: "Torts", question: "A basketball player suffered a serious injury while participating in an impromptu basketball game at a public park. The injury occurred when the player and his opponent each tried to obtain possession of the ball when it rebounded from the backboard after a missed shot at the basket. During that encounter, the player was struck and injured by the opponent's elbow. The player now seeks compensation from the opponent.\n\nAt the trial, evidence was introduced tending to prove that the game had been rough from the beginning, that elbows and knees had frequently been used to discourage interference by opposing players, and that the player had been one of those making liberal use of such tactics. In this action, will the player prevail?", answers: ["(A) Yes, if the opponent intended to strike the player with his elbow.", "(B) Yes, if the opponent intended to cause a harmful or offensive contact with the player.", "(C) No, because the player impliedly consented to rough play.", "(D) No, unless the opponent intentionally used force that exceeded the player's consent."], correct: "D" },
 { id: 3045, category: "Torts", question: "In a trial to a jury, a restaurateur proved that the power company's negligent maintenance of a transformer caused a fire that destroyed his restaurant. The jury returned a verdict for the restaurateur in the amount of $450,000 for property loss and $500,000 for emotional distress. The trial judge entered judgment in those amounts. The power company appealed that part of the judgment awarding $500,000 for emotional distress.\n\nOn appeal, the judgment should be", answers: ["(A) affirmed, because the power company negligently caused the restaurateur's emotional distress.", "(B) affirmed, because harm arising from emotional distress is as real as harm caused by physical impact.", "(C) reversed, because the law does not recognize a claim for emotional distress incident to negligently caused property loss.", "(D) reversed, unless the jury found that the restaurateur suffered physical harm as a consequence of the emotional distress caused by his property loss."], correct: "C" },
 { id: 3046, category: "Torts", question: "A customer fell and injured himself when he slipped on a banana peel while shopping at a grocer's store. The banana peel was fresh and clean except for a mark made by the heel of the customer's shoe. In an action brought by the customer against the grocer, these are the only facts in evidence.\n\nShould the trial judge permit the case to go to the jury?", answers: ["(A) No, because the customer had an obligation to watch where he stepped.", "(B) No, because there is not a reasonable basis for inferring that the grocer knew or should have known of the banana peel.", "(C) Yes, because it is more likely than not that the peel came from a banana offered for sale by the grocer.", "(D) Yes, because the grocer could foresee that a customer might slip on a banana peel."], correct: "B" },
 { id: 3047, category: "Torts", question: "While approaching an intersection with the red light against him, a motorist suffered a heart attack that rendered him unconscious. The motorist's car struck a child, who was crossing the street with the green light in her favor. Under the state motor vehicle code, it is an offense to drive through a red traffic light.\n\nThe child sued the motorist to recover for her injuries. At trial it was stipulated that (1) immediately prior to suffering the heart attack, the motorist had been driving within the speed limit, had seen the red light, and had begun to slow his car; (2) the motorist had no history of heart disease and no warning of this attack; (3) while the motorist was unconscious, his car ran the red light.\n\nOn cross motions for directed verdicts on the issue of liability at the conclusion of the proofs, the court should", answers: ["(A) grant the child's motion, because the motorist ran a red light in violation of the motor vehicle code.", "(B) grant the child's motion, because, in the circumstances, reasonable persons would infer that the motorist was negligent.", "(C) grant the motorist's motion, because he had no history of heart disease or warning of the heart attack.", "(D) deny both motions and submit the case to the jury, to determine whether, in the circumstances, the motorist's conduct was that of a reasonably prudent person."], correct: "C" },
 { id: 3048, category: "Torts", question: "A company designed and built a processing plant for the manufacture of an explosive chemical. An engineer was retained by the company to design a filter system for the processing plant. She prepared an application for a permit to build the plant's filter system and submitted it to the state's Department of Environmental Protection (DEP). As required by DEP regulations, the engineer submitted a blueprint to the DEP with the application for permit. The blueprint showed the entire facility and was signed and sealed by her as a licensed professional engineer.\n\nAfter the project was completed, a portion of the processing plant exploded, injuring the plaintiff. During discovery in an action by the plaintiff against the engineer, it was established that the explosion was caused by a design defect in the processing plant that was unrelated to the filter system designed by the engineer.\n\nIn that action, will the plaintiff prevail?", answers: ["(A) Yes, if the engineer signed, sealed, and submitted a blueprint that showed the design defect.", "(B) Yes, because all of the plant's designers are jointly and severally liable for the defect.", "(C) No, because the engineer owed no duty to the plaintiff to prevent the particular risk of harm.", "(D) No, if the engineer was an independent contractor."], correct: "C" },
 { id: 3049, category: "Torts", question: "An established cemetery sells \"pre-need\" funeral plans, which include funeral services, a casket, and a burial plot, in exchange for advance payment. By state statute, any purchaser of a funeral plan of this sort can cancel the purchase at any time, subject to a penalty imposed by the seller of up to 15 percent of the purchase price.\n\nA former high-level employee of the cemetery, who knew of the limitations specified in the state statute, recently built a new cemetery near the established cemetery. To promote the new cemetery, the former employee sent postcards to local residents asserting that anyone who had already purchased a pre-need funeral plan had \"an unlimited right to cancel that plan at any time, for any reason, without penalty.\" The postcard also offered a $100 rebate on a pre-need funeral plan with the new cemetery to anyone who canceled an existing plan elsewhere.\n\nShortly after the promotion began, several purchasers of funeral plans with the established cemetery canceled their plans and purchased plans from the new cemetery. When the established cemetery withheld penalties from the refund amounts, the purchasers objected and threatened to notify the state consumer protection bureau.\n\nThe established cemetery has sued the former employee for tortious interference with contract. The former employee has moved for summary judgment, based on the foregoing facts.\n\nShould the court grant the motion?", answers: ["(A) No, because a reasonable jury could conclude that the former employee bribed purchasers in order to take business from the established cemetery.", "(B) No, because the former employee could be found by a jury to have intentionally and improperly interfered with the established cemetery's contracts.", "(C) Yes, because the established cemetery's contracts with purchasers were terminable at the option of the purchasers.", "(D) Yes, because the former employee was simply competing with the established cemetery."], correct: "B" },
 { id: 3050, category: "Torts", question: "A woman's three-year-old daughter was killed in an automobile accident. At the woman's direction, the child's body was taken to a mausoleum for interment. Normally, the mausoleum's vaults are permanently sealed with marble plates secured by \"tamper-proof\" screws. After the child's body was placed in the mausoleum, however, only a fiberglass panel secured by caulking compound covered her vault. About a month later, the child's body was discovered in a cemetery located near the mausoleum. It had apparently been left there by vandals who had taken it from the mausoleum.\n\nAs a result of this experience, the woman suffered great emotional distress.\n\nIf the woman sues the mausoleum for the damages arising from her emotional distress, will she prevail?", answers: ["(A) No, because the woman experienced no threat to her own safety.", "(B) No, unless the mausoleum's behavior was extreme and outrageous.", "(C) Yes, if the mausoleum failed to use reasonable care to safeguard the body.", "(D) Yes, unless the woman suffered no physical harm as a consequence of her emotional distress."], correct: "C" },
 { id: 3051, category: "Torts", question: "A mother rushed her eight-year-old daughter to the emergency room at the local hospital after her daughter fell off her bicycle and hit her head on a sharp rock. The wound caused by the fall was extensive and bloody.\n\nThe mother was permitted to remain in the treatment room and held her daughter's hand while the emergency room physician cleaned and sutured the wound. During the procedure, the mother said that she was feeling faint and stood up to leave the room. While leaving the room, the mother fainted and, in falling, struck her head on a metal fixture that protruded from the emergency room wall. She sustained a serious injury as a consequence.\n\nIf the mother sues the hospital to recover damages for her injury, will she prevail?", answers: ["(A) Yes, because the mother was a public invitee of the hospital's.", "(B) Yes, unless the fixture was an obvious, commonly used, and essential part of the hospital's equipment.", "(C) No, unless the hospital's personnel failed to take reasonable steps to anticipate and prevent the mother's injury.", "(D) No, because the hospital's personnel owed the mother no affirmative duty of care."], correct: "C" },
 { id: 3052, category: "Torts", question: "The governor of a state signed a death warrant for a convicted murderer. A man and a woman were active opponents of the death penalty. At a demonstration protesting the execution of the murderer, the man and the woman carried large signs that stated, \"The Governor Is A Murderer.\" A television station broadcast news coverage of the demonstration, including pictures of the signs carried by the man and the woman. If the governor asserts a defamation claim against the TV station, will the governor prevail?", answers: ["(A) Yes, because the signs would cause persons to hold the governor in lower esteem.", "(B) Yes, if the governor proves that the station showed the signs with knowledge of falsity or reckless disregard of the truth that the governor had not committed homicide.", "(C) No, unless the governor proves he suffered pecuniary loss resulting from harm to his reputation proximately caused by the televised images of the signs.", "(D) No, if the only reasonable interpretation of the signs was that the term \"murderer\" was intended as a characterization of one who would sign a death warrant."], correct: "D" },
 { id: 3053, category: "Torts", question: "In preparation for a mountain-climbing expedition, a climber purchased the necessary climbing equipment from a sporting goods retailer. A week later, the climber fell from a rock face when a safety device he had purchased from the retailer malfunctioned because of a defect in its manufacture. Thereafter, a bystander was severely injured when he tried to reach and give assistance to the climber on the ledge to which the climber had fallen. The bystander's injury was not caused by any fault on his own part.\n\nIf the bystander brings an action against the retailer to recover damages for his injuries, will the bystander prevail?", answers: ["(A) No, unless the retailer could have discovered the defect by a reasonable inspection of the safety device.", "(B) No, because the bystander did not rely on the representation of safety implied from the sale of the safety device by the retailer.", "(C) Yes, unless the climber was negligent in failing to test the safety device.", "(D) Yes, because injury to a person in the bystander's position was foreseeable if the safety device failed."], correct: "D" },
 { id: 3054, category: "Torts", question: "For ten years, a vacationer and a neighbor have owned summer vacation homes on adjoining lots. A stream flows through both lots. As a result of a childhood swimming accident, the vacationer is afraid of water and has never gone close to the stream.\n\nThe neighbor built a dam on her property that has completely stopped the flow of the stream to the vacationer's property.\n\nIn a suit by the vacationer against the neighbor, will the vacationer prevail?", answers: ["(A) Yes, if the damming unreasonably interferes with the use and enjoyment of the vacationer's property.", "(B) Yes, if the neighbor intended to affect the vacationer's property.", "(C) No, because the vacationer made no use of the stream.", "(D) No, if the dam was built in conformity with all applicable laws."], correct: "A" },
 { id: 3055, category: "Torts", question: "The day after a seller completed the sale of his house and moved out, one of the slates flew off the roof during a windstorm. The slate struck a pedestrian, who was on the public sidewalk. The pedestrian was seriously injured.\n\nThe roof is old and has lost several slates in ordinary windstorms on other occasions.\n\nIf the pedestrian sues the seller to recover damages for his injuries, will the pedestrian prevail?", answers: ["(A) Yes, because the roof was defective when the seller sold the house.", "(B) Yes, if the seller should have been aware of the condition of the roof and should have realized that it was dangerous to persons outside the premises.", "(C) No, because the seller was neither the owner nor the occupier of the house when the pedestrian was injured.", "(D) No, if the pedestrian knew that in the past slates had blown off the roof during windstorms."], correct: "B" },
 { id: 3056, category: "Torts", question: "A patient had been under the care of a cardiologist for three years prior to submitting to an elective operation that was performed by a surgeon. Two days thereafter, the patient suffered a stroke, resulting in a coma, caused by a blood clot that lodged in her brain. When it appeared that she had entered a permanent vegetative state, with no hope of recovery, the artificial life-support system that had been provided was withdrawn, and she died a few hours later. The withdrawal of artificial life support had been requested by her family, and duly approved by a court. The surgeon was not involved in that decision, or in its execution.\n\nThe administrator of the patient's estate thereafter filed a wrongful death action against the surgeon, claiming that the surgeon was negligent in having failed to consult a cardiologist prior to the operation. At the trial the plaintiff offered evidence that accepted medical practice would require examination of the patient by a cardiologist prior to the type of operation that the surgeon performed.\n\nIn this action, the plaintiff should", answers: ["(A) prevail, if the surgeon was negligent in failing to have the patient examined by a cardiologist prior to the operation.", "(B) prevail, if the blood clot that caused the patient's death was caused by the operation which the surgeon performed.", "(C) not prevail, absent evidence that a cardiologist, had one examined the patient before the operation, would probably have provided advice that would have changed the outcome.", "(D) not prevail, because the surgeon had nothing to do with the withdrawal of artificial life support, which was the cause of the patient's death."], correct: "C" },
 { id: 3057, category: "Torts", question: "A racetrack held a motorcycle race, which was sponsored by a local motorcycle dealership. Under the sponsorship agreement, the dealership was required to arrange for licensed and trained emergency medical technicians (EMTs) to be present during the race. The dealership contracted with a licensed and reputable emergency medical services (EMS) firm that supplied EMTs for events such as these.\n\nA motorcyclist participating in the race was injured when he lost control of his motorcycle. The motorcyclist was treated at the scene by the EMTs. In removing the motorcyclist's helmet, one of the EMTs twisted the motorcyclist's neck, causing him to become permanently paralyzed.\n\nThe motorcyclist has sued both the EMS firm and the dealership, alleging that the EMT's careless conduct caused his paralysis.\n\nAssuming the validity of the motorcyclist's negligence claim against the EMS firm, which of the following best characterizes the dealership's potential liability?", answers: ["(A) The dealership is directly liable for hiring the EMS firm.", "(B) The dealership is vicariously liable, because it owed a non-delegable duty to provide emergency care for the race.", "(C) The dealership is vicariously liable, because the EMT was careless in the course of her employment.", "(D) The dealership is neither directly liable nor vicariously liable."], correct: "D" },
 { id: 3058, category: "Torts", question: "A well-known movie star was drinking wine at a nightclub. A bottle of the wine, with its label plainly showing, was on the table in front of the movie star. An amateur photographer asked the movie star if he could take his picture and the movie star said, \"Yes.\" Subsequently, the photographer sold the photo to the wine company, whose wine was pictured in the photo. The wine company, without the movie star's consent, used the photo in a wine advertisement in a nationally circulated magazine. The caption below the photo stated, \"This movie star enjoys our wine.\"\n\nIf the movie star sues the wine company to recover damages as a result of the wine company's use of the photograph, will the movie star prevail?", answers: ["(A) No, because the movie star consented to being photographed.", "(B) No, because the movie star is a public figure.", "(C) Yes, because the wine company made commercial use of the photograph.", "(D) Yes, unless the movie star did, in fact, enjoy that specific wine."], correct: "C" },
 { id: 3059, category: "Torts", question: "A bright nine-year-old child attended a day care center after school. The day care center was located near a man-made duck pond on the property of a corporation. During the winter, the pond was used for ice skating when conditions were suitable. At a time when the pond was only partially frozen, the child sneaked away from the center and walked out onto the ice covering the pond. The ice gave way, and the child fell into the cold water. He suffered shock and would have drowned had he not been rescued by a passerby. At the time of the incident, the pond was clearly marked with signs that stated, \"THIN ICE— NO SKATING.\" When the child left the day care center, the center was staffed with a reasonable number of qualified personnel, and the center's employees were exercising reasonable care to ensure that the children in their charge did not leave the premises. The jurisdiction follows a rule of pure comparative negligence.\n\nIn a suit brought on the child's behalf against the day care center, who is likely to prevail?", answers: ["(A) The child, because he left the center while he was under the center's care.", "(B) The child, because the day care center is located near a pond.", "(C) The day care center, because it was not negligent.", "(D) The day care center, because the child was a trespasser."], correct: "C" },
 { id: 3060, category: "Torts", question: "The owner of a truck leasing company asked a salesman who worked at the company to deliver $1,000 to the company's main office. The following week, as a result of a dispute over whether the money had been delivered, the owner instructed the salesman to come to the office to submit to a lie detector test.\n\nWhen the salesman reported to the owner's office for the test, it was not administered. Instead, without hearing the salesman's story, the owner shouted at him, \"You're a thief,\" and fired him. The owner's shout was overheard by several other employees who were in another office, which was separated from the owner's office by a thin partition. The next day, the salesman accepted another job at a higher salary. Several weeks later, upon discovering that the money had not been stolen, the owner offered to rehire the salesman.\n\nIn a suit for slander by the salesman against the owner, the salesman will", answers: ["(A) prevail, because the salesman was fraudulently induced to go to the office for a lie detector test, which was not, in fact, given.", "(B) prevail, if the owner should have foreseen that the statement would be overheard by other employees.", "(C) not prevail, if the owner made the charge in good faith, believing it to be true.", "(D) not prevail, because the statement was made to the salesman alone and intended for his ears only."], correct: "B" },
 { id: 3061, category: "Torts", question: "A patron ate a spicy dinner at a restaurant on Sunday night. He enjoyed the food and noticed nothing unusual about the dinner.\n\nLater that evening, the patron had an upset stomach. He slept well through the night, went to work the next day, and ate three meals. His stomach discomfort persisted, and by Tuesday morning he was too ill to go to work.\n\nEventually, the patron consulted his doctor, who found that the patron was infected with a bacterium that can be contracted from contaminated food. Food can be contaminated when those who prepare it do not adequately wash their hands.\n\nThe patron sued the restaurant for damages. He introduced testimony from a health department official that various health code violations had been found at the restaurant both before and after the patron's dinner, but that none of the restaurant's employees had signs of bacterial infection when they were tested one month after the incident.\n\nThe restaurant's best argument in response to the patron's suit would be that", answers: ["(A) No one else who ate at the restaurant on Sunday complained about stomach discomfort.", "(B) The restaurant instructs its employees to wash their hands carefully and is not responsible if any employee fails to follow these instructions.", "(C) The patron has failed to establish that the restaurant's food caused his illness.", "(D) The patron assumed the risk of an upset stomach by choosing to eat spicy food."], correct: "C" },
 { id: 3062, category: "Torts", question: "As an encyclopedia salesman approached the grounds on which a house was situated, he saw a sign that said, \"No salesmen. Trespassers will be prosecuted. Proceed at your own risk.\" Although the salesman had not been invited to enter, he ignored the sign and drove up the driveway toward the house. As he rounded a curve, a powerful explosive charge buried in the driveway exploded, and the salesman was injured.\n\nCan the salesman recover damages from the homeowner for his injuries?", answers: ["(A) Yes, if the homeowner was responsible for the explosive charge under the driveway.", "(B) Yes, unless the homeowner, when he planted the charge, intended only to deter, not to harm, a possible intruder.", "(C) No, because the salesman ignored the sign, which warned him against proceeding further.", "(D) No, if the homeowner reasonably feared that intruders would come and harm him or his family."], correct: "A" },
 { id: 3063, category: "Torts", question: "The personnel director of an investment company told a job applicant during an interview that the company was worth millions of dollars and that the company's portfolio would triple in the next several months. The applicant was very excited about the company's prospects and accepted an offer to work for the company. Two days later, the applicant read in the newspaper that the investment company had filed for bankruptcy reorganization. As a result of reading this news, the applicant suffered severe emotional distress but he immediately found another comparable position.\n\nIs the applicant likely to prevail in his action for negligent misrepresentation?", answers: ["(A) No, because the applicant did not suffer any physical injury or pecuniary loss.", "(B) No, because the personnel director's statement was purely speculative.", "(C) Yes, because the applicant relied on the personnel director's misrepresentations about the investment company.", "(D) Yes, because the personnel director should have foreseen that his misrepresentations would cause the applicant to be upset."], correct: "A" },
 { id: 3064, category: "Torts", question: "A bus passenger was seated next to a woman whom he did not know. The woman stood to exit the bus, leaving a package on the seat. The passenger lightly tapped the woman on the back to get her attention and to inform her that she had forgotten the package. Because the woman had recently had back surgery, the tap was painful and caused her to twist and seriously injure her back.\n\nIf the woman sues the passenger to recover for the back injury, will she prevail?", answers: ["(A) No, because she is presumed to have consented to the ordinary contacts of daily life.", "(B) No, because she was not put in apprehension because of the touching.", "(C) Yes, because the passenger intentionally touched her.", "(D) Yes, because the passenger's intentional touching seriously injured her."], correct: "A" },
 { id: 3065, category: "Torts", question: "A smoker and a nonsmoker were seated at adjoining tables in a small restaurant. The smoker's table was in the smoking section, and the nonsmoker's table was in the nonsmoking section. When the smoker lit a cigarette, the nonsmoker politely requested that he not smoke, explaining that she had a severe allergy to cigarette smoke. The smoker ignored the nonsmoker's request and continued to smoke. As a result, the nonsmoker was hospitalized with a severe allergic reaction to the smoke.\n\nThe nonsmoker brought a battery action against the smoker.\n\nWhich of the following questions will NOT be an issue in the battery action?", answers: ["(A) Did the smoker intend to cause the nonsmoker's contact with the cigarette smoke?", "(B) Does smoke have the physical properties necessary for making the kind of contact required for battery?", "(C) Is contact with cigarette smoke from a lawful smoking section in a restaurant the kind of contact one must endure as a voluntary restaurant patron?", "(D) Was the smoker's conduct unreasonable under the circumstances?"], correct: "D" },
 { id: 3066, category: "Torts", question: "A hiker sustained a head injury when he was struck by a limb that fell from a tree. At the time of his injury, the hiker was walking through a forest on private property without the property owner's knowledge or permission. It was determined that the limb fell because the tree was infested with termites.\n\nIn an action by the hiker against the property owner to recover for his head injury, will the hiker prevail?", answers: ["(A) No, because the property owner could not foresee that anyone would be injured.", "(B) No, because the property owner breached no duty to the hiker, who was a trespasser.", "(C) Yes, because the property owner had a duty to prevent the trees on his property from becoming dangerous.", "(D) Yes, because the property owner is liable for hidden dangers on his property."], correct: "B" },
 { id: 3067, category: "Torts", question: "A homeowner resented the fact that joggers and walkers would sometimes come onto his property just beside the sidewalk in order to enjoy the feel of walking or running on grass. He put up a \"No Trespassing\" sign, but it did not stop the practice. He then put up a \"Beware of Skunk\" sign and bought a young skunk. He took the skunk to a vet to have its scent gland removed. Unfortunately, the vet did not perform the operation properly, and the scent gland was not removed. The homeowner was unaware that it had not been removed.\n\nOne day a walker was out for a stroll. When she came to the homeowner's property, she walked on the grass alongside the sidewalk on the homeowner's property. The skunk came up behind the walker and sprayed her with its scent. The smell was overpowering, and she fainted. She struck her head on the sidewalk and suffered serious injuries.\n\nThe probable result of the walker's claim against the homeowner is that she will", answers: ["(A) recover, because the skunk was a private nuisance.", "(B) recover, because the skunk was not a domesticated animal.", "(C) not recover, because the walker was a trespasser.", "(D) not recover, because the vet was the cause of the injury."], correct: "B" },
 { id: 3068, category: "Torts", question: "A driver negligently ran over a pedestrian. A bystander witnessed the accident from across the street. The bystander ran to the pedestrian, whom he did not know, and administered first aid, but the pedestrian died in the bystander's arms. The bystander suffered serious emotional distress as a result of his failure to save the pedestrian's life, but he experienced no resulting physical manifestations. The bystander brought a negligence action against the driver.\n\nIs the bystander likely to prevail?", answers: ["(A) No, because the bystander assumed the risk.", "(B) No, because the bystander had no familial or other preexisting relationship with the pedestrian.", "(C) Yes, because danger invites rescue.", "(D) Yes, because the bystander was in the zone of danger."], correct: "B" },
 { id: 3069, category: "Torts", question: "An 11-year-old boy was driving a full-size motorcycle on a private road, where the boy was a trespasser. The motorcycle hit a tire that had fallen off a truck driven by a delivery company employee who was making a delivery to an address on the private road. The boy was injured when his motorcycle went out of control after striking the tire.\n\nIn a negligence action brought on behalf of the boy against the delivery company, the company contends that the boy was contributorily negligent and that his damages, if any, should be reduced in conformance with the jurisdiction's comparative negligence statute. The boy argues that his conduct should be judged according to the standard of a reasonable child of like age, intelligence, and experience under the circumstances.\n\nIs the boy entitled to be judged according to the standard of care that he has argued for?", answers: ["(A) No, because the boy was driving a motorcycle.", "(B) No, because the boy was trespassing on the private road.", "(C) Yes, because comparative negligence applies.", "(D) Yes, because the boy was 11 years old at the time."], correct: "A" },
 { id: 3070, category: "Torts", question: "A company manufactured metal stamping presses that were usually sold with an installed safety device that made it impossible for a press to close on a worker's hands. The safety device produced a substantially safer machine without affecting the machine's ease of use, and cost the manufacturer little. The company strongly recommended that its presses be purchased with the safety device installed, but would sell a press without the safety device at a slightly reduced price. This alternative model included a warning that the press created a risk of closing on the operator's hand and crushing it.\n\nRejecting the company's advice, a worker's employer purchased a stamping press without the safety device. The press closed on the worker's hand, crushing it. In an action brought by the worker against the company, will the worker prevail?", answers: ["(A) Yes, because the company's press was the cause in fact of the worker's injury.", "(B) Yes, because the company sold the press to the worker's employer without an installed safety device.", "(C) No, because the failure of the worker's employer to purchase the press with a safety device was a superseding intervening cause of the worker's injury.", "(D) No, because the company strongly recommended that the worker's employer purchase the press with the safety device."], correct: "B" },
 { id: 3071, category: "Torts", question: "A child was bitten by a dog while playing in a fenced-in common area of an apartment complex owned by a landlord. The child was the guest of a tenant living in the complex, and the dog was owned by another tenant. The owner of the dog knew that the dog had a propensity to bite, but the landlord did not have any notice of the dog's vicious propensities.\n\nIn an action by the child against the landlord, will the child prevail?", answers: ["(A) Yes, because in these circumstances a landlord is strictly liable.", "(B) Yes, because a landlord's duty to protect a tenant's guests from dangerous conditions is non-delegable.", "(C) No, because the landlord did not have any notice of the dog's vicious propensities.", "(D) No, because a landlord owes no duty to a tenant's gratuitous guests."], correct: "C" },
 { id: 3072, category: "Torts", question: "A driver, returning from a long shift at a factory, fell asleep at the wheel and lost control of his car. As a result, his car collided with a police car driven by an officer who was returning to the station after having responded to an emergency. The police officer was injured in the accident. The police officer sued the driver in negligence for her injuries. The driver moved for summary judgment, arguing that the common-law firefighters' rule barred the suit.\n\nShould the court grant the motion?", answers: ["(A) No, because the firefighters' rule does not apply to police officers.", "(B) No, because the police officer's injuries were not related to any special dangers of her job.", "(C) Yes, because the accident would not have occurred but for the emergency.", "(D) Yes, because the police officer was injured on the job."], correct: "B" },
];

// ── TOPIC CONFIG ──────────────────────────────────────────────────────────────
const TOPICS = {
  "Constitutional Law": { label: "Con Law", color: "#6c63ff", icon: "⚖️", questions: CON_LAW_QUESTIONS },
  "Evidence": { label: "Evidence", color: "#f5a623", icon: "🔍", questions: EVIDENCE_QUESTIONS },
  "Torts": { label: "Torts", color: "#e74c3c", icon: "⚡", questions: TORTS_QUESTIONS },
};

const TOPIC_NAMES = Object.keys(TOPICS);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const C = {
  bg: "#0b0d14",
  surface: "#13151f",
  card: "#181b28",
  border: "#252836",
  accent: "#6c63ff",
  accentDim: "#6c63ff33",
  gold: "#f5c518",
  green: "#3ecf8e",
  greenDim: "#3ecf8e22",
  red: "#ff5c5c",
  redDim: "#ff5c5c22",
  text: "#eaedf5",
  muted: "#7a7f94",
  p1: "#6c63ff",
  p2: "#f5a623",
};

// ── SCREENS ──────────────────────────────────────────────────────────────────

// ── SESSION STORAGE HELPERS ──────────────────────────────────────────────────
const getAllSessions = () => {
  try {
    const raw = localStorage.getItem("btSessions");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};

const upsertSession = (name, code) => {
  try {
    const sessions = getAllSessions().filter(s => s.code !== code);
    sessions.unshift({ name, code, lastSeen: Date.now() });
    localStorage.setItem("btSessions", JSON.stringify(sessions.slice(0, 10)));
  } catch {}
};

const removeSession = (code) => {
  try {
    const sessions = getAllSessions().filter(s => s.code !== code);
    localStorage.setItem("btSessions", JSON.stringify(sessions));
  } catch {}
};

// ── HOME / LOBBY SCREEN ───────────────────────────────────────────────────────
function HomeScreen({ onCreateGame, onJoinGame }) {
  const urlCode = (() => {
    try { return new URLSearchParams(window.location.search).get("room") || ""; } catch { return ""; }
  })();

  const [mode, setMode] = useState(urlCode ? "join" : null);
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState(urlCode.toUpperCase());

  // Clear ?room= from URL once on mount so Back to Lobby shows lobby not join form
  useEffect(() => {
    if (urlCode) {
      try { window.history.replaceState({}, "", window.location.pathname); } catch {}
    }
  }, []);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [roomStatuses, setRoomStatuses] = useState({});
  const [loadingStatuses, setLoadingStatuses] = useState(true);

  const FB_URL = "https://cracked-bar-trivia-default-rtdb.firebaseio.com";

  // Load all saved sessions and fetch their status from Firebase
  useEffect(() => {
    const saved = getAllSessions();
    setSessions(saved);
    if (saved.length === 0) { setLoadingStatuses(false); return; }

    const fetchStatuses = async () => {
      const statuses = {};
      await Promise.all(saved.map(async ({ name, code }) => {
        try {
          const res = await fetch(`${FB_URL}/rooms/${code}.json`);
          if (!res.ok) return;
          const room = await res.json();
          if (!room) return;
          const isCreator = room.creator === name;
          const role = isCreator ? "creator" : "joiner";
          const oppRole = isCreator ? "joiner" : "creator";
          const opponent = isCreator ? (room.joiner || "Waiting for opponent…") : room.creator;

          // Find current round
          const rounds = Object.keys(room.roundTopics || {}).map(Number).sort((a, b) => b - a);
          const currentRound = rounds.length > 0 ? rounds[0] : 0;
          const totalRounds = Object.keys(room.roundTopics || {}).length;

          // Check if it's my turn
          let myTurn = false;
          const topicChosen = room.roundTopics && room.roundTopics[currentRound];
          if (!topicChosen) {
            // No topic yet — only the creator needs to act (spin the wheel)
            myTurn = isCreator;
          } else {
            const myDone = [0, 1, 2].every(i => room.answers && room.answers[`${role}_r${currentRound}q${i}`]);
            const oppDone = [0, 1, 2].every(i => room.answers && room.answers[`${oppRole}_r${currentRound}q${i}`]);
            if (!myDone) {
              myTurn = true; // haven't answered yet
            } else if (myDone && oppDone) {
              // Both done — need to handle round result / next round spin
              myTurn = true;
            }
            // else myDone && !oppDone → waiting for opponent, myTurn stays false
          }

          statuses[code] = { opponent, myTurn, currentRound: totalRounds, opponent };
        } catch {}
      }));
      setRoomStatuses(statuses);
      setLoadingStatuses(false);
    };
    fetchStatuses();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) { setError("Enter your name"); return; }
    setError("");
    await onCreateGame(name.trim());
  };

  const handleJoin = async () => {
    if (!name.trim()) { setError("Enter your name"); return; }
    if (!joinCode.trim()) { setError("Enter a room code"); return; }
    setError("");
    setJoining(true);
    await onJoinGame(name.trim(), joinCode.trim().toUpperCase());
    setJoining(false);
  };

  const handleResumeSession = async (session) => {
    setJoining(true);
    await onJoinGame(session.name, session.code, true);
    setJoining(false);
  };

  const handleRemoveSession = (code, e) => {
    e.stopPropagation();
    removeSession(code);
    setSessions(s => s.filter(x => x.code !== code));
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, sans-serif", padding: "24px 16px 40px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32, paddingTop: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: C.accent, textTransform: "uppercase", marginBottom: 10, fontFamily: "monospace" }}>MBE Bar Prep</div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: C.text, margin: "0 0 6px", letterSpacing: -1.5 }}>Bar Exam <span style={{ color: C.accent }}>Trivia</span></h1>
          <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>Async multiplayer · 5 rounds · 3 questions each</p>
        </div>

        {/* Active Games Lobby */}
        {sessions.length > 0 && !mode && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 12 }}>Your Active Games</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sessions.map(session => {
                const status = roomStatuses[session.code];
                const myTurn = status ? status.myTurn : null;
                const opponent = status ? status.opponent : "Loading…";
                const rounds = status ? status.currentRound : "—";
                return (
                  <div key={session.code}
                    onClick={() => !joining && handleResumeSession(session)}
                    style={{ background: C.card, border: `2px solid ${myTurn ? C.green : C.border}`, borderRadius: 14,
                      padding: "14px 16px", cursor: joining ? "default" : "pointer", position: "relative",
                      transition: "border-color 0.2s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          {myTurn === true && <span style={{ background: C.green, color: "#000", fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 10, fontFamily: "monospace", letterSpacing: 1, flexShrink: 0 }}>YOUR TURN</span>}
                          {myTurn === false && <span style={{ background: C.border, color: C.muted, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 10, fontFamily: "monospace", letterSpacing: 1, flexShrink: 0 }}>WAITING</span>}
                          {myTurn === null && loadingStatuses && <span style={{ color: C.muted, fontSize: 11 }}>Loading…</span>}
                          <span style={{ color: C.accent, fontFamily: "monospace", fontSize: 11, fontWeight: 700 }}>{session.code}</span>
                        </div>
                        <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>vs {opponent}</div>
                        <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>Round {rounds} of 5 · Playing as {session.name}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <span style={{ fontSize: 20 }}>{myTurn ? "▶" : "⏳"}</span>
                        <button onClick={e => handleRemoveSession(session.code, e)}
                          style={{ background: "transparent", border: "none", color: C.muted, fontSize: 18,
                            cursor: "pointer", padding: "4px", lineHeight: 1, borderRadius: 6 }}>✕</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* New Game Actions */}
        {!mode && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {sessions.length > 0 && <div style={{ color: C.muted, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 2 }}>New Game</div>}
            <button onClick={() => setMode("create")} style={btnStyle(C.accent)}>⚡ Create Game</button>
            <button onClick={() => setMode("join")} style={btnStyle("transparent", C.border, C.text)}>🔗 Join with Code</button>
          </div>
        )}

        {mode === "create" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 4, fontFamily: "monospace" }}>YOUR NAME</div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
              style={inputStyle} onKeyDown={e => e.key === "Enter" && handleCreate()} autoFocus />
            {error && <div style={{ color: C.red, fontSize: 13 }}>{error}</div>}
            <button onClick={handleCreate} style={btnStyle(C.accent)}>Create Game →</button>
            <button onClick={() => { setMode(null); setError(""); }} style={btnStyle("transparent", C.border, C.muted)}>Back</button>
          </div>
        )}

        {mode === "join" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 4, fontFamily: "monospace" }}>YOUR NAME</div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" style={inputStyle} />
            <div style={{ color: C.muted, fontSize: 12, marginBottom: 4, fontFamily: "monospace" }}>ROOM CODE</div>
            <input value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="e.g. AB12CD"
              style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: 3, textTransform: "uppercase" }}
              maxLength={6} onKeyDown={e => e.key === "Enter" && handleJoin()} autoFocus />
            {error && <div style={{ color: C.red, fontSize: 13 }}>{error}</div>}
            <button onClick={handleJoin} disabled={joining}
              style={{ ...btnStyle(joining ? C.surface : C.accent, joining ? C.border : C.accent), opacity: joining ? 0.6 : 1, cursor: joining ? "default" : "pointer" }}>
              {joining ? "Joining…" : "Join Game →"}
            </button>
            <button onClick={() => { setMode(null); setError(""); }} style={btnStyle("transparent", C.border, C.muted)}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── SHARE CODE SCREEN ────────────────────────────────────────────────────────
// Creator sees this immediately after hitting Create Game — code is live,
// joiner can connect before the spin even happens.
function ShareCodeScreen({ creatorName, roomCode, onSpin, inviteCopied, onCopy }) {
  // Always build from origin only — never inherit existing query/hash
  const joinUrl = (() => {
    try {
      return window.location.origin + "?room=" + roomCode;
    } catch { return "?room=" + roomCode; }
  })();
  const shareMsg = joinUrl;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: C.accent, textTransform: "uppercase", marginBottom: 10, fontFamily: "monospace" }}>Game Created</div>
          <h2 style={{ color: C.text, fontSize: 26, fontWeight: 900, margin: "0 0 8px" }}>Invite Your Opponent</h2>
          <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>They click the link and join instantly — no code needed</p>
        </div>

        <div style={{ background: C.card, border: "2px solid " + C.accent, borderRadius: 18, padding: "24px", textAlign: "center", marginBottom: 20 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Room Code</div>
          <div style={{ color: C.accent, fontSize: 44, fontWeight: 900, letterSpacing: 8, fontFamily: "monospace", lineHeight: 1, marginBottom: 16 }}>{roomCode}</div>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 8 }}>Join Link</div>
          <div
            onClick={onCopy}
            style={{ background: C.surface, border: "1px solid " + C.border, borderRadius: 8, padding: "10px 12px",
              wordBreak: "break-all", fontSize: 12, fontFamily: "monospace", color: C.accent,
              lineHeight: 1.5, cursor: "pointer", userSelect: "all" }}>
            {joinUrl}
          </div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 6 }}>Tap above or use the button below to copy</div>
        </div>

        <textarea id="share-ta" readOnly value={shareMsg} onChange={() => {}}
          style={{ position: "absolute", left: -9999, top: -9999, opacity: 0 }} />

        <button onClick={onCopy}
          style={{ background: inviteCopied ? C.green : C.surface, border: "2px solid " + (inviteCopied ? C.green : C.border),
            borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer",
            width: "100%", color: inviteCopied ? "#fff" : C.text, fontFamily: "system-ui, sans-serif",
            transition: "all 0.2s", marginBottom: 12 }}>
          {inviteCopied ? "✓ Copied!" : "📋 Copy Invite Link"}
        </button>

        <button onClick={onSpin} style={{ background: C.accent, border: "2px solid " + C.accent, borderRadius: 12,
          padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%",
          color: "#fff", fontFamily: "system-ui, sans-serif" }}>
          🎡 Spin for Topic →
        </button>
      </div>
    </div>
  );
}

// ── JOINER WAITING SCREEN ─────────────────────────────────────────────────────
// Shown to the joiner after they enter their name+code if the creator hasn't
// spun yet. Polls every 2s until roundTopics[0] is set.
function JoinerWaitingScreen({ creatorName, onBackToLobby }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎡</div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: "0 0 8px" }}>Waiting for Topic</h2>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>
          <span style={{ color: C.p1, fontWeight: 700 }}>{creatorName}</span> is picking the first topic…
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 32 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, opacity: 0.7,
              animation: `pulse ${0.6 + i * 0.2}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        <button onClick={onBackToLobby} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 20px", color: C.muted, fontSize: 14, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
          ← Back to Lobby
        </button>
      </div>
    </div>
  );
}

// ── TOPIC REVEAL SCREEN ───────────────────────────────────────────────────────
// Joiner sees this after the creator has spun. The wheel auto-spins and lands
// on the chosen topic so both sides feel the same experience.
function TopicRevealScreen({ creatorName, topic, onReady }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const topicConfig = TOPICS[topic];

  const topics = TOPIC_NAMES;
  const sliceAngle = (2 * Math.PI) / topics.length;
  const sliceColors = topics.map(t => TOPICS[t].color);

  const draw = (angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const cx = W / 2, cy = W / 2, r = W / 2 - 6;
    ctx.clearRect(0, 0, W, W);
    topics.forEach((t, i) => {
      const start = angle + i * sliceAngle - Math.PI / 2;
      const end = start + sliceAngle;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, end); ctx.closePath();
      ctx.fillStyle = sliceColors[i] + "cc"; ctx.fill();
      ctx.strokeStyle = "#0b0d14"; ctx.lineWidth = 2; ctx.stroke();
      const mid = start + sliceAngle / 2;
      const lx = cx + Math.cos(mid) * r * 0.62, ly = cy + Math.sin(mid) * r * 0.62;
      ctx.save(); ctx.translate(lx, ly); ctx.rotate(mid + Math.PI / 2);
      ctx.font = `${Math.max(14, Math.min(22, W / (topics.length * 1.4)))}px serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = "#fff";
      ctx.fillText(TOPICS[t].icon, 0, -10);
      ctx.font = `bold ${Math.max(9, Math.min(13, W / (topics.length * 1.9)))}px system-ui`;
      ctx.fillText(TOPICS[t].label, 0, 8); ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "#0b0d14"; ctx.fill(); ctx.strokeStyle = "#252836"; ctx.lineWidth = 2; ctx.stroke();
    const pW = 14, pH = 22;
    ctx.beginPath(); ctx.moveTo(cx, cy - r - 2); ctx.lineTo(cx - pW / 2, cy - r + pH); ctx.lineTo(cx + pW / 2, cy - r + pH);
    ctx.closePath(); ctx.fillStyle = "#eaedf5"; ctx.fill();
  };

  useEffect(() => {
    draw(0);
    // Calculate landing angle for the chosen topic
    const targetIdx = topics.indexOf(topic);
    // We want the pointer (at -PI/2 from canvas top) to point at slice targetIdx.
    // Slice i starts at angle + i*sliceAngle - PI/2, midpoint at angle + i*sliceAngle - PI/2 + sliceAngle/2
    // For pointer at top (angle=-PI/2 in canvas), we need the mid of slice targetIdx at -PI/2:
    // finalAngle + targetIdx*sliceAngle - PI/2 + sliceAngle/2 = -PI/2  =>  finalAngle = -(targetIdx + 0.5)*sliceAngle
    const finalAngle = -(targetIdx + 0.5) * sliceAngle;
    // Add several full rotations for drama
    const totalAngle = finalAngle - (6 * 2 * Math.PI);
    const startAngle = 0;
    const duration = 3500;
    const startTime = performance.now();

    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      angleRef.current = startAngle + (totalAngle - startAngle) * eased;
      draw(angleRef.current);
      if (t < 1) { rafRef.current = requestAnimationFrame(animate); }
      else { setRevealed(true); }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 380, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: C.accent, textTransform: "uppercase", marginBottom: 10, fontFamily: "monospace" }}>Round 1</div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: "0 0 6px" }}>
          <span style={{ color: C.p1 }}>{creatorName}</span> spun the wheel
        </h2>
        <p style={{ color: C.muted, fontSize: 13, margin: "0 0 24px" }}>Watch where it lands…</p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <canvas ref={canvasRef} width={300} height={300} style={{ borderRadius: "50%", display: "block" }} />
        </div>

        {revealed && (
          <>
            <div style={{ background: topicConfig.color + "22", border: `2px solid ${topicConfig.color}`, borderRadius: 14, padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{topicConfig.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: topicConfig.color, fontWeight: 800, fontSize: 16 }}>{topic}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{creatorName} picked this topic</div>
              </div>
            </div>
            <button onClick={onReady} style={btnStyle(C.accent)}>Let's Play →</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── SPIN WHEEL ────────────────────────────────────────────────────────────────
// Draws a pie-slice wheel on canvas. Scales automatically to however many
// topics are in TOPIC_NAMES — add a topic to TOPICS and it appears instantly.
function SpinWheelScreen({ pickerName, onTopicChosen, isFirstRound }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  // Wheel state kept in refs so animation loop always sees current values
  const angleRef = useRef(0);          // current rotation in radians
  const velocityRef = useRef(0);       // radians per frame
  const spinningRef = useRef(false);

  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState(null);   // topic name once settled
  const [confirmed, setConfirmed] = useState(false);

  const topics = TOPIC_NAMES;
  const sliceAngle = (2 * Math.PI) / topics.length;

  // Slice colours cycle through each topic's own colour
  const sliceColors = topics.map(t => TOPICS[t].color);

  // ── Draw ────────────────────────────────────────────────────────────────────
  const draw = (angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const cx = W / 2, cy = W / 2, r = W / 2 - 6;

    ctx.clearRect(0, 0, W, W);

    // Slices
    topics.forEach((topic, i) => {
      const start = angle + i * sliceAngle - Math.PI / 2;
      const end   = start + sliceAngle;
      const color = sliceColors[i];

      // Slice fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = color + "cc";
      ctx.fill();

      // Slice border
      ctx.strokeStyle = "#0b0d14";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Icon + label
      const midAngle = start + sliceAngle / 2;
      const labelR   = r * 0.62;
      const tx = cx + Math.cos(midAngle) * labelR;
      const ty = cy + Math.sin(midAngle) * labelR;

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(midAngle + Math.PI / 2);

      // Icon
      ctx.font = `${Math.max(14, Math.min(22, W / (topics.length * 1.4)))}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.fillText(TOPICS[topic].icon, 0, -10);

      // Label
      ctx.font = `bold ${Math.max(9, Math.min(13, W / (topics.length * 1.9)))}px system-ui`;
      ctx.fillStyle = "#fff";
      ctx.fillText(TOPICS[topic].label, 0, 8);

      ctx.restore();
    });

    // Centre hub
    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
    ctx.fillStyle = "#0b0d14";
    ctx.fill();
    ctx.strokeStyle = "#252836";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pointer (triangle at top)
    const pW = 14, pH = 22;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r - 2);
    ctx.lineTo(cx - pW / 2, cy - r + pH);
    ctx.lineTo(cx + pW / 2, cy - r + pH);
    ctx.closePath();
    ctx.fillStyle = "#eaedf5";
    ctx.fill();
  };

  // ── Initial draw ────────────────────────────────────────────────────────────
  useEffect(() => {
    draw(angleRef.current);
  }, []);

  // ── Spin ────────────────────────────────────────────────────────────────────
  const handleSpin = () => {
    if (spinning || landed) return;
    setSpinning(true);
    setLanded(null);
    spinningRef.current = true;

    // Random full rotations (8–14) + random offset for unpredictability
    const extraAngle = (8 + Math.random() * 6) * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const targetAngle = angleRef.current + extraAngle;
    const duration = 4000 + Math.random() * 1500; // 4–5.5 s
    const startAngle = angleRef.current;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      angleRef.current = startAngle + (targetAngle - startAngle) * eased;
      draw(angleRef.current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Determine which slice is under the pointer.
        // draw() places slice i from: angle + i*sliceAngle - PI/2
        // The pointer sits at canvas angle -PI/2.
        // Slice i is under the pointer when: angle + i*sliceAngle - PI/2 ≈ -PI/2
        // i.e. i*sliceAngle ≈ -angle  →  norm = (-angle) mod 2PI
        const norm = ((-angleRef.current) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(norm / sliceAngle) % topics.length;
        spinningRef.current = false;
        setSpinning(false);
        setLanded(topics[idx]);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const handleConfirm = () => {
    if (!landed) return;
    setConfirmed(true);
    onTopicChosen(landed);
  };

  // Canvas size: fill available width, max 320
  const SIZE = 300;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 380, width: "100%", textAlign: "center" }}>

        {/* Header */}
        <div style={{ fontSize: 11, letterSpacing: 4, color: C.accent, textTransform: "uppercase", marginBottom: 10, fontFamily: "monospace" }}>
          {isFirstRound ? "Round 1" : "Next Round"}
        </div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: "0 0 6px" }}>
          {isFirstRound ? "Pick a Topic" : "Spin for the Next Topic"}
        </h2>
        <p style={{ color: C.muted, fontSize: 13, margin: "0 0 24px", lineHeight: 1.5 }}>
          {isFirstRound
            ? <span><span style={{ color: C.p1, fontWeight: 700 }}>{pickerName}</span> — you created the game, spin to pick the first topic</span>
            : <span><span style={{ color: C.p1, fontWeight: 700 }}>{pickerName}</span> — spin the wheel to pick the next topic</span>
          }
        </p>

        {/* Wheel */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, position: "relative" }}>
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            style={{ borderRadius: "50%", display: "block" }}
          />
        </div>

        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 16px", marginBottom: 24 }}>
          {topics.map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: TOPICS[t].color, flexShrink: 0 }} />
              <span style={{ color: C.muted, fontSize: 12 }}>{TOPICS[t].label}</span>
            </div>
          ))}
        </div>

        {/* Result banner */}
        {landed && !confirmed && (
          <div style={{ background: TOPICS[landed].color + "22", border: `2px solid ${TOPICS[landed].color}`, borderRadius: 14, padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>{TOPICS[landed].icon}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: TOPICS[landed].color, fontWeight: 800, fontSize: 16 }}>{landed}</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>The wheel has spoken</div>
            </div>
          </div>
        )}

        {/* Buttons */}
        {!landed && (
          <button
            onClick={handleSpin}
            disabled={spinning}
            style={{
              background: spinning ? C.surface : C.accent,
              border: `2px solid ${spinning ? C.border : C.accent}`,
              borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700,
              cursor: spinning ? "default" : "pointer", width: "100%", color: "#fff",
              fontFamily: "system-ui, sans-serif", opacity: spinning ? 0.6 : 1,
              transition: "all 0.2s",
            }}>
            {spinning ? "Spinning…" : "🎡 Spin the Wheel"}
          </button>
        )}

        {landed && !confirmed && (
          <button
            onClick={handleConfirm}
            style={{ background: TOPICS[landed].color, border: `2px solid ${TOPICS[landed].color}`, borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
            Play {landed} →
          </button>
        )}
      </div>
    </div>
  );
}

// ── WAITING FOR OPPONENT TOPIC SPIN ──────────────────────────────────────────
function WaitingForTopicScreen({ loserName, onBackToLobby }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 16 }}>🎡</div>
        <h2 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: "0 0 8px" }}>Waiting for Topic</h2>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>
          <span style={{ color: C.p1, fontWeight: 700 }}>{loserName}</span> is picking the next topic…
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 32 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, animation: `pulse ${0.6 + i * 0.2}s ease-in-out infinite alternate`, opacity: 0.7 }} />
          ))}
        </div>
        <button onClick={onBackToLobby} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 20px", color: C.muted, fontSize: 14, cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>
          ← Back to Lobby
        </button>
      </div>
    </div>
  );
}

// Fully controlled — no internal state. Parent owns selectedAnswer so
// feedback survives across renders without a remount destroying it.
function QuestionScreen({ question, questionNum, totalQuestions, onAnswer,
                          timeLeft, topic, isLastQuestion,
                          selectedAnswer, waitingForOpponent, onAdvance, onBackToLobby }) {
  const topicConfig = TOPICS[topic] || TOPICS["Constitutional Law"];
  const correctAnswer = question.correct;
  const isRevealed = !!selectedAnswer;
  const isLocked = isRevealed || waitingForOpponent;
  const timerColor = timeLeft > 30 ? C.green : timeLeft > 15 ? C.gold : C.red;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, sans-serif", padding: "0 0 40px" }}>
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace" }}>Q {questionNum} / {totalQuestions}</div>
          <div style={{ color: timerColor, fontWeight: 800, fontSize: 20, fontFamily: "monospace" }}>{timeLeft}s</div>
        </div>
        <div style={{ maxWidth: 560, margin: "6px auto 0" }}>
          <div style={{ height: 3, background: C.border, borderRadius: 2 }}>
            <div style={{ height: "100%", width: `${(timeLeft / TIME_PER_Q) * 100}%`, background: timerColor, borderRadius: 2, transition: "width 1s linear, background 0.3s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <span style={{ background: topicConfig.color + "22", color: topicConfig.color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace", letterSpacing: 1 }}>
              {topicConfig.icon} {topicConfig.label.toUpperCase()}
            </span>
          </div>
          <p style={{ color: C.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{question.question}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.answers.map((ans, i) => {
            const letter = ["A", "B", "C", "D"][i];
            const isSelected = selectedAnswer === letter;
            const isCorrect = letter === correctAnswer;
            let bg = C.surface, borderColor = C.border, badgeBg = C.border;
            if (isRevealed) {
              if (isCorrect)              { bg = C.greenDim; borderColor = C.green; badgeBg = C.green; }
              else if (isSelected)        { bg = C.redDim;   borderColor = C.red;   badgeBg = C.red; }
            } else if (isSelected) {
              bg = topicConfig.color + "22"; borderColor = topicConfig.color; badgeBg = topicConfig.color;
            }
            return (
              <button key={i} onClick={() => { if (!isLocked) onAnswer(letter); }}
                disabled={isLocked}
                style={{ background: bg, border: `2px solid ${borderColor}`, borderRadius: 12, padding: "14px 16px", cursor: isLocked ? "default" : "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "flex-start", transition: "all 0.2s" }}>
                <span style={{ background: badgeBg, color: "#fff", borderRadius: 6, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1, fontFamily: "monospace" }}>{letter}</span>
                <span style={{ color: C.text, fontSize: 14, lineHeight: 1.5, flex: 1 }}>{ans.replace(/^\([A-D]\)\s*/, "")}</span>
                {isRevealed && isCorrect             && <span style={{ fontSize: 16, flexShrink: 0 }}>✓</span>}
                {isRevealed && isSelected && !isCorrect && <span style={{ fontSize: 16, flexShrink: 0 }}>✗</span>}
              </button>
            );
          })}
        </div>

        {isRevealed && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: selectedAnswer === correctAnswer ? C.greenDim : C.redDim, border: `1px solid ${selectedAnswer === correctAnswer ? C.green : C.red}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: isLastQuestion ? 0 : 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{selectedAnswer === correctAnswer ? "✅" : "❌"}</span>
              <div>
                <div style={{ color: selectedAnswer === correctAnswer ? C.green : C.red, fontWeight: 700, fontSize: 14 }}>
                  {selectedAnswer === correctAnswer ? "Correct!" : `Incorrect — answer was ${correctAnswer}`}
                </div>
                {isLastQuestion && (
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>
                    Waiting for opponent to finish the round…
                  </div>
                )}
              </div>
            </div>
            {!isLastQuestion && (
              <button
                onClick={onAdvance}
                style={{ background: C.accent, border: `2px solid ${C.accent}`, borderRadius: 12, padding: "14px 16px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
                Next Question →
              </button>
            )}
            {isLastQuestion && onBackToLobby && (
              <button
                onClick={onBackToLobby}
                style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 20px", color: C.muted, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: "system-ui, sans-serif", marginTop: 8 }}>
                ← Back to Lobby
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RoundResultScreen({ roundResults, playerName, opponentName, scores, onNextRound, isGameOver, currentTopic, roundWinner, myName, isLoser, onPickTopic, onBackToLobby }) {
  const myTotal = roundResults.filter(r => r.myCorrect).length;
  const theirTotal = roundResults.filter(r => r.theirCorrect).length;
  const iWon = myTotal > theirTotal;
  const tied = myTotal === theirTotal;
  const topicConfig = TOPICS[currentTopic] || TOPICS["Constitutional Law"];

  const handleContinue = () => {
    if (!isGameOver && !tied) {
      onPickTopic();
    } else {
      onNextRound(null);
    }
  };

  const loserName = tied ? null : (!iWon ? myName : opponentName);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 460, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{tied ? "🤝" : iWon ? "🏆" : "💪"}</div>
          <h2 style={{ color: C.text, fontSize: 28, fontWeight: 900, margin: "0 0 6px" }}>
            {tied ? "Round Tied!" : iWon ? "You Won This Round!" : `${opponentName} Won This Round`}
          </h2>
          <p style={{ color: C.muted, fontSize: 14, margin: "0 0 8px" }}>Round complete · {roundResults.length} questions</p>
          <span style={{ background: topicConfig.color + "22", color: topicConfig.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>
            {topicConfig.icon} {topicConfig.label}
          </span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {[{ name: "You", score: myTotal, color: C.p1, total: scores.me }, { name: opponentName, score: theirTotal, color: C.p2, total: scores.them }].map((p, i) => (
            <div key={i} style={{ flex: 1, background: C.surface, border: `2px solid ${tied ? C.border : (i === 0 ? iWon : !iWon) ? p.color : C.border}`, borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ color: p.color, fontSize: 11, fontWeight: 700, marginBottom: 6, fontFamily: "monospace" }}>{p.name.toUpperCase()}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: C.text, lineHeight: 1 }}>{p.score}</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>this round</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 8, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
                <span style={{ color: C.text, fontWeight: 700 }}>{p.total}</span> total pts
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", letterSpacing: 1 }}>QUESTION BREAKDOWN</div>
          </div>
          {roundResults.map((r, i) => (
            <div key={i} style={{ padding: "12px 16px", borderBottom: i < roundResults.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace", width: 20 }}>Q{i + 1}</div>
              <div style={{ flex: 1, color: C.muted, fontSize: 12 }}>Correct: <span style={{ color: C.text, fontFamily: "monospace" }}>{r.correct}</span></div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{r.myCorrect ? "✅" : "❌"}</span>
                <span style={{ fontSize: 14 }}>{r.theirCorrect ? "✅" : "❌"}</span>
              </div>
            </div>
          ))}
          <div style={{ padding: "8px 16px 8px", display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <div style={{ color: C.p1, fontSize: 11, fontFamily: "monospace" }}>YOU</div>
            <div style={{ color: C.p2, fontSize: 11, fontFamily: "monospace" }}>{opponentName.toUpperCase()}</div>
          </div>
        </div>

        {!isGameOver && !tied && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ color: C.muted, fontSize: 13 }}>
              <span style={{ color: tied ? C.muted : (!iWon ? C.p1 : C.p2), fontWeight: 700 }}>{loserName}</span>
              {" "}gets to pick the next topic
            </div>
          </div>
        )}

        {!isGameOver
          ? <>
              <button
                onClick={!tied && !isLoser ? undefined : handleContinue}
                disabled={!tied && !isLoser}
                style={{
                  ...btnStyle(tied || isLoser ? C.accent : C.surface, tied || isLoser ? C.accent : C.border, tied || isLoser ? "#fff" : C.muted),
                  opacity: tied || isLoser ? 1 : 0.5,
                  cursor: tied || isLoser ? "pointer" : "default",
                  marginBottom: 10,
                }}>
                {tied ? "Next Round →" : isLoser ? "Pick the Next Topic →" : "Wait for Topic Pick…"}
              </button>
              <button onClick={onBackToLobby} style={btnStyle("transparent", C.border, C.text)}>← Back to Lobby</button>
            </>
          : <button onClick={() => onNextRound(null)} style={btnStyle(C.accent)}>See Final Results →</button>
        }
      </div>
    </div>
  );
}

function FinalResultScreen({ playerName, opponentName, scores, onPlayAgain, onBackToLobby, onEndGame }) {
  const iWon = scores.me > scores.them;
  const tied = scores.me === scores.them;
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>{tied ? "🤝" : iWon ? "🎉" : "💪"}</div>
          <h2 style={{ color: C.text, fontSize: 32, fontWeight: 900, margin: "0 0 8px" }}>
            {tied ? "It's a Tie!" : iWon ? "You Won!" : `${opponentName} Won!`}
          </h2>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 0 }}>Final results · 5 rounds complete</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {[{ name: "You", score: scores.me, color: C.p1 }, { name: opponentName, score: scores.them, color: C.p2 }].map((p, i) => (
            <div key={i} style={{ flex: 1, background: C.surface, border: `2px solid ${(i === 0 ? iWon : !iWon) && !tied ? p.color : C.border}`, borderRadius: 16, padding: "20px 12px", textAlign: "center" }}>
              <div style={{ color: p.color, fontSize: 11, fontWeight: 700, marginBottom: 8, fontFamily: "monospace" }}>{p.name.toUpperCase()}</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.text, lineHeight: 1 }}>{p.score}</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>points</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onPlayAgain} style={btnStyle(C.accent)}>🔄 Play Another Series</button>
          <button onClick={onBackToLobby} style={btnStyle("transparent", C.border, C.text)}>← Back to Lobby</button>
          <button onClick={onEndGame} style={btnStyle("transparent", C.border, C.red)}>🗑 End Game Room</button>
        </div>
      </div>
    </div>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────
const inputStyle = { background: "#13151f", border: `1px solid #252836`, borderRadius: 10, padding: "14px 16px", fontSize: 16, color: "#eaedf5", width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "system-ui, sans-serif" };

function btnStyle(bg, border, color = "#fff") {
  return { background: bg, border: `2px solid ${border || bg}`, borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%", color, fontFamily: "system-ui, sans-serif", transition: "opacity 0.15s" };
}

// ── GAME STATE ENGINE ─────────────────────────────────────────────────────────
const QUESTIONS_PER_ROUND = 3;
const MAX_ROUNDS = 5;
const TIME_PER_Q = 90;

export default function App() {
  // ── SESSION RESTORE ───────────────────────────────────────────────────────
  // On mount, check localStorage for a saved session and rejoin automatically
  const [screen, setScreen] = useState("home");
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [pendingCreatorName, setPendingCreatorName] = useState("");
  const [sessionRestoring, setSessionRestoring] = useState(true);

  const [roundQuestions, setRoundQuestions] = useState([]);
  const [usedIds, setUsedIds] = useState(() => {
    const init = {};
    TOPIC_NAMES.forEach(t => { init[t] = []; });
    return init;
  });

  const [currentRound, setCurrentRound] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(TOPIC_NAMES[0]);
  const [myAnswers, setMyAnswers] = useState({});
  const [scores, setScores] = useState({ me: 0, them: 0 });
  const [roundResults, setRoundResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [timerActive, setTimerActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);
  const [showCodeBanner, setShowCodeBanner] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [roundLoser, setRoundLoser] = useState(null);
  const [topicRevealTopic, setTopicRevealTopic] = useState(null);
  const [currentQSelected, setCurrentQSelected] = useState(null);

  // ── Refs for values needed inside async callbacks / intervals ────────────
  // React state is stale inside closures; refs always have the current value.
  const roomCodeRef      = useRef("");
  const isCreatorRef     = useRef(false);
  const currentRoundRef  = useRef(0);
  const currentQRef      = useRef(0);
  const myAnswersRef     = useRef({});
  const roundQuestionsRef = useRef([]);

  const timerRef = useRef(null);
  const pollRef  = useRef(null);

  // Keep refs in sync with state
  const setRoomCodeBoth = (v) => { roomCodeRef.current = v; setRoomCode(v); };
  const setIsCreatorBoth = (v) => { isCreatorRef.current = v; setIsCreator(v); };

  // ── SESSION PERSISTENCE ───────────────────────────────────────────────────
  const saveSession = (name, code) => { upsertSession(name, code); };
  const clearSession = (code) => { if (code) removeSession(code); };

  // On mount: just show home — lobby loads sessions itself
  useEffect(() => {
    // Migrate old single-session format if present
    try {
      const old = localStorage.getItem("btSession");
      if (old) {
        const { name, code } = JSON.parse(old);
        if (name && code) upsertSession(name, code);
        localStorage.removeItem("btSession");
      }
    } catch {}
    setSessionRestoring(false);
  }, []);

  const qKey = (round, q) => `r${round}q${q}`;

  // ── STORAGE HELPERS (Firebase Realtime Database REST API) ───────────────
  const FB_URL = "https://cracked-bar-trivia-default-rtdb.firebaseio.com";

  // Full room write (PUT) — used for creating/updating whole room structure
  const saveRoomData = async (code, data) => {
    try {
      const res = await fetch(`${FB_URL}/rooms/${code}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { console.error("[SAVE] HTTP error", res.status); return false; }
      return true;
    } catch (e) { console.error("[SAVE] FAILED", e); return false; }
  };

  // Atomic merge (PATCH) — writes only specified fields, no overwrite risk
  const patchRoomData = async (code, patch) => {
    try {
      const res = await fetch(`${FB_URL}/rooms/${code}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) { console.error("[PATCH] HTTP error", res.status); return false; }
      return true;
    } catch (e) { console.error("[PATCH] FAILED", e); return false; }
  };

  // Write a single deeply-nested field atomically — no read-modify-write needed
  const setRoomField = async (code, path, value) => {
    try {
      const res = await fetch(`${FB_URL}/rooms/${code}/${path}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (!res.ok) { console.error("[SET] HTTP error", res.status); return false; }
      return true;
    } catch (e) { console.error("[SET] FAILED", e); return false; }
  };

  const loadRoomData = async (code) => {
    try {
      const res = await fetch(`${FB_URL}/rooms/${code}.json`);
      if (!res.ok) { console.error("[LOAD] HTTP error", res.status); return null; }
      const data = await res.json();
      return data || null;
    } catch (e) { console.error("[LOAD] FAILED", e); return null; }
  };

  // ── DRAW QUESTIONS FOR A ROUND ──────────────────────────────────────────
  const drawRoundQuestions = (topic, alreadyUsed) => {
    const pool = TOPICS[topic].questions.filter(q => !alreadyUsed.includes(q.id));
    const available = pool.length >= QUESTIONS_PER_ROUND ? pool : TOPICS[topic].questions;
    return shuffle(available).slice(0, QUESTIONS_PER_ROUND);
  };

  // ── CREATE GAME ──────────────────────────────────────────────────────────
  // Step 1: creator enters name → generate code, save stub room, show share screen
  const handleCreateGame = async (name) => {
    const code = generateCode();
    setPendingCreatorName(name);
    setPlayerName(name);
    setIsCreatorBoth(true);
    setRoomCodeBoth(code);

    // Save a stub room immediately so joiner can connect before spin
    const stubRoom = {
      code, creator: name, joiner: null,
      roundQuestions: {}, roundTopics: {},
      usedIds: (() => { const u = {}; TOPIC_NAMES.forEach(t => { u[t] = []; }); return u; })(),
      answers: {}, topicPick: null, createdAt: Date.now(),
    };
    const saved = await saveRoomData(code, stubRoom);

    if (!saved) {
      alert("Could not create game — network error. Check your connection and try again.");
      return;
    }

    saveSession(name, code);
    setScreen("shareCode");

    // Poll until joiner arrives
    pollRef.current = setInterval(async () => {
      const r = await loadRoomData(code);
      if (r && r.joiner) { setOpponentName(r.joiner); clearInterval(pollRef.current); }
    }, 3000);
  };

  // Step 2: creator hits "Spin for Topic" on the share screen
  const handleGoSpin = () => setScreen("topicPickerFirst");

  // Step 3: creator confirms topic from wheel → update room with questions
  const handleFirstTopicChosen = async (topic) => {
    const name = pendingCreatorName;
    const code = roomCodeRef.current;
    const firstQs = drawRoundQuestions(topic, []);

    const initUsed = {};
    TOPIC_NAMES.forEach(t => { initUsed[t] = []; });
    initUsed[topic] = firstQs.map(q => q.id);

    // Write atomically — preserves joiner name if already registered
    await Promise.all([
      setRoomField(code, "roundTopics/0", topic),
      setRoomField(code, "roundQuestions/0", firstQs.map(q => q.id)),
      setRoomField(code, "usedIds", initUsed),
      setRoomField(code, "answers", {}),
      setRoomField(code, "topicPick", null),
      setRoomField(code, "rematch", null),
    ]);

    roundQuestionsRef.current = firstQs;
    setCurrentTopic(topic);
    setRoundQuestions(firstQs);
    setUsedIds(initUsed);
    startQuestion(0, 0);
    setScreen("playing");
  };

  // ── JOIN GAME ─────────────────────────────────────────────────────────────
  const handleJoinGame = async (name, code, silent = false) => {
    const room = await loadRoomData(code);

    if (!room) {
      if (!silent) alert("Room not found. Double-check the code and try again.");
      return;
    }

    // Determine role — allow rejoin if name matches an existing player
    const isCreator = room.creator === name;
    const isExistingJoiner = room.joiner === name;
    const isNewJoiner = !room.joiner;

    if (!isCreator && !isExistingJoiner && !isNewJoiner) {
      if (!silent) alert("This game already has two players.");
      return;
    }

    // Register as joiner if new — atomic write, no race condition
    if (isNewJoiner && !isCreator) {
      await setRoomField(code, "joiner", name);
    }

    saveSession(name, code);
    setRoomCodeBoth(code);
    setIsCreatorBoth(isCreator);
    setPlayerName(name);
    setOpponentName(isCreator ? (room.joiner || "") : room.creator);

    const allQs = Object.values(TOPICS).flatMap(t => t.questions);

    // Figure out which round we're in by finding the highest round with questions
    const rounds = Object.keys(room.roundTopics || {}).map(Number).sort((a, b) => b - a);
    const currentRoundNum = rounds.length > 0 ? rounds[0] : 0;
    const topic = room.roundTopics ? room.roundTopics[currentRoundNum] : null;
    const qs = topic
      ? (room.roundQuestions[currentRoundNum] || []).map(id => allQs.find(q => q.id === id)).filter(Boolean)
      : [];
    const usedFromRoom = room.usedIds || (() => { const u = {}; TOPIC_NAMES.forEach(t => { u[t] = []; }); return u; })();

    if (!topic || qs.length < QUESTIONS_PER_ROUND) {
      // Creator hasn't spun yet
      setScreen("joinerWaiting");
      clearInterval(pollRef.current);
      pollRef.current = setInterval(async () => {
        const r = await loadRoomData(code);
        if (!r) return;
        const t = r.roundTopics ? r.roundTopics[0] : null;
        const q = t ? (r.roundQuestions[0] || []).map(id => allQs.find(q => q.id === id)).filter(Boolean) : [];
        if (t && q.length >= QUESTIONS_PER_ROUND) {
          clearInterval(pollRef.current);
          const used = r.usedIds || (() => { const u = {}; TOPIC_NAMES.forEach(x => { u[x] = []; }); return u; })();
          roundQuestionsRef.current = q;
          setCurrentTopic(t);
          setRoundQuestions(q);
          setUsedIds(used);
          setTopicRevealTopic(t);
          setScreen(isCreator ? "playing" : "topicReveal");
          if (isCreator) startQuestion(0, 0);
        }
      }, 2000);
      return;
    }

    // Game is in progress — check if this player already submitted answers this round
    const role = isCreator ? "creator" : "joiner";
    const oppRole = isCreator ? "joiner" : "creator";
    const myAnswersThisRound = {};
    let iAlreadyFinished = true;
    for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
      const k = qKey(currentRoundNum, i);
      const ans = room.answers ? room.answers[`${role}_${k}`] : null;
      if (ans) { myAnswersThisRound[k] = ans; } else { iAlreadyFinished = false; }
    }

    roundQuestionsRef.current = qs;
    setCurrentTopic(topic);
    setRoundQuestions(qs);
    setUsedIds(usedFromRoom);
    currentRoundRef.current = currentRoundNum;
    setCurrentRound(currentRoundNum);

    if (iAlreadyFinished) {
      // I already submitted — check if opponent also done
      const oppDone = Array.from({ length: QUESTIONS_PER_ROUND }, (_, i) =>
        room.answers && room.answers[`${oppRole}_${qKey(currentRoundNum, i)}`]
      ).every(Boolean);

      if (oppDone) {
        // Both done — rebuild results and show round result
        const results = [];
        for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
          const k = qKey(currentRoundNum, i);
          const q = qs[i];
          const myAns = myAnswersThisRound[k] || "__timeout__";
          const theirAns = room.answers[`${oppRole}_${k}`];
          results.push({
            correct: q ? q.correct : "?",
            myAnswer: myAns, theirAnswer: theirAns,
            myCorrect: myAns === (q ? q.correct : null),
            theirCorrect: theirAns === (q ? q.correct : null),
          });
        }
        const myScore = results.filter(r => r.myCorrect).length;
        const theirScore = results.filter(r => r.theirCorrect).length;
        const loser = myScore > theirScore ? "them" : myScore < theirScore ? "me" : "tie";
        myAnswersRef.current = myAnswersThisRound;
        setMyAnswers(myAnswersThisRound);
        setRoundLoser(loser);
        setRoundResults(results);
        // Rebuild cumulative scores from all rounds
        let meTotal = 0, themTotal = 0;
        const allRounds = Object.keys(room.roundTopics || {}).map(Number);
        allRounds.forEach(rNum => {
          for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
            const k = qKey(rNum, i);
            const q = (room.roundQuestions[rNum] || []).map(id => allQs.find(x => x.id === id)).filter(Boolean)[i];
            const myA = room.answers[`${role}_${k}`];
            const theirA = room.answers[`${oppRole}_${k}`];
            if (myA && q && myA === q.correct) meTotal++;
            if (theirA && q && theirA === q.correct) themTotal++;
          }
        });
        setScores({ me: meTotal, them: themTotal });
        setScreen("roundResult");
      } else {
        // I'm done, opponent isn't — show Q3 locked with my answer, waiting for opponent
        myAnswersRef.current = myAnswersThisRound;
        setMyAnswers(myAnswersThisRound);
        // Manually set state so Q3 shows as answered+locked without resetting via startQuestion
        const lastQ = QUESTIONS_PER_ROUND - 1;
        const lastKey = qKey(currentRoundNum, lastQ);
        currentRoundRef.current = currentRoundNum;
        currentQRef.current = lastQ;
        setCurrentRound(currentRoundNum);
        setCurrentQ(lastQ);
        setCurrentQSelected(myAnswersThisRound[lastKey] || "__timeout__");
        setTimeLeft(0);
        setTimerActive(false);
        setWaitingForOpponent(true);
        setScreen("playing");
        pollForRoundCompletion(currentRoundNum, myAnswersThisRound);
      }
    } else {
      // I haven't finished — resume playing from Q1 (answers not stored mid-round)
      myAnswersRef.current = {};
      setMyAnswers({});
      if (isCreator) {
        startQuestion(currentRoundNum, 0);
        setScreen("playing");
      } else {
        setTopicRevealTopic(topic);
        setScreen("topicReveal");
      }
    }
  };

  // Joiner hits "Let's Play" after topic reveal animation
  const handleJoinerReady = () => {
    startQuestion(currentRoundRef.current, 0);
    setScreen("playing");
  };

  // ── QUESTION TIMER ────────────────────────────────────────────────────────
  const startQuestion = (round, qIndex) => {
    currentRoundRef.current = round;
    currentQRef.current = qIndex;
    setCurrentRound(round);
    setCurrentQ(qIndex);
    setTimeLeft(TIME_PER_Q);
    setTimerActive(true);
    setTimerKey(k => k + 1);
    setWaitingForOpponent(false);
    setCurrentQSelected(null);
  };

  useEffect(() => {
    if (!timerActive) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimerActive(false);
          // Use refs — not stale closure state
          handleAnswer("__timeout__", currentRoundRef.current, currentQRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerKey]);

  // ── ANSWER ────────────────────────────────────────────────────────────────
  const handleAnswer = async (letter, round, qIdx) => {
    // Guard: if already waiting for opponent, ignore any answer attempts
    if (waitingForOpponent) return;
    clearInterval(timerRef.current);
    setTimerActive(false);
    setCurrentQSelected(letter);

    const key = qKey(round, qIdx);
    const newMyAnswers = { ...myAnswersRef.current, [key]: letter };
    myAnswersRef.current = newMyAnswers;
    setMyAnswers(newMyAnswers);

    const nextQ = qIdx + 1;
    if (nextQ < QUESTIONS_PER_ROUND) {
      // Player taps "Next Question" — onAdvance in QuestionScreen calls startQuestion
    } else {
      // All 3 done — write each answer atomically (no read-modify-save race condition)
      const role = isCreatorRef.current ? "creator" : "joiner";
      const code = roomCodeRef.current;
      const writes = [];
      for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
        const k = qKey(round, i);
        const answerKey = `answers/${role}_${k}`;
        writes.push(setRoomField(code, answerKey, newMyAnswers[k] || "__timeout__"));
      }
      await Promise.all(writes);
      setWaitingForOpponent(true);
      pollForRoundCompletion(round, newMyAnswers);
    }
  };

  // ── POLL FOR OPPONENT FINISHING THE ROUND ────────────────────────────────
  const pollForRoundCompletion = (round, currentMyAnswers) => {
    const oppRole = isCreatorRef.current ? "joiner" : "creator";
    const code = roomCodeRef.current;

    pollRef.current = setInterval(async () => {
      const room = await loadRoomData(code);
      if (!room) return;

      const allOppDone = Array.from({ length: QUESTIONS_PER_ROUND }, (_, i) =>
        room.answers[`${oppRole}_${qKey(round, i)}`]
      ).every(Boolean);

      if (allOppDone) {
        clearInterval(pollRef.current);

        const qs = roundQuestionsRef.current;
        const results = [];
        for (let i = 0; i < QUESTIONS_PER_ROUND; i++) {
          const k = qKey(round, i);
          const q = qs[i];
          const myAns = currentMyAnswers[k] || "__timeout__";
          const theirAns = room.answers[`${oppRole}_${k}`];
          results.push({
            correct: q ? q.correct : "?",
            myAnswer: myAns,
            theirAnswer: theirAns,
            myCorrect: myAns === (q ? q.correct : null),
            theirCorrect: theirAns === (q ? q.correct : null),
          });
        }

        const myRoundScore   = results.filter(r => r.myCorrect).length;
        const theirRoundScore = results.filter(r => r.theirCorrect).length;
        const loser = myRoundScore > theirRoundScore ? "them"
                    : myRoundScore < theirRoundScore ? "me" : "tie";
        setRoundLoser(loser);
        setScores(s => ({ me: s.me + myRoundScore, them: s.them + theirRoundScore }));
        setRoundResults(results);
        setWaitingForOpponent(false);
        setScreen("roundResult");
      }
    }, 2000);
  };

  // ── POST-ROUND TOPIC LOGIC ────────────────────────────────────────────────
  const handlePickTopic = () => setScreen("topicPicker");

  const handleTopicChosen = async (topic) => {
    const nextRound = currentRoundRef.current + 1;
    const newUsed = { ...usedIds };
    const newQs = drawRoundQuestions(topic, newUsed[topic] || []);
    newUsed[topic] = [...(newUsed[topic] || []), ...newQs.map(q => q.id)];
    const code = roomCodeRef.current;

    // Write each field atomically to avoid overwriting concurrent answer writes
    await Promise.all([
      setRoomField(code, "usedIds", newUsed),
      setRoomField(code, `roundTopics/${nextRound}`, topic),
      setRoomField(code, `roundQuestions/${nextRound}`, newQs.map(q => q.id)),
      setRoomField(code, "topicPick", { round: nextRound, topic, timestamp: Date.now() }),
    ]);

    roundQuestionsRef.current = newQs;
    setUsedIds(newUsed);
    setCurrentTopic(topic);
    setRoundQuestions(newQs);
    startQuestion(nextRound, 0);
    setScreen("playing");
  };

  const handleWinnerWaitsForTopic = () => {
    const nextRound = currentRoundRef.current + 1;
    const code = roomCodeRef.current;
    setScreen("waitingForTopic");
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const room = await loadRoomData(code);
      if (!room) return;
      if (room.topicPick && room.topicPick.round === nextRound) {
        clearInterval(pollRef.current);
        const topic = room.topicPick.topic;
        const allQs = Object.values(TOPICS).flatMap(t => t.questions);
        const qs = (room.roundQuestions[nextRound] || []).map(id => allQs.find(q => q.id === id)).filter(Boolean);
        roundQuestionsRef.current = qs;
        setCurrentTopic(topic);
        setRoundQuestions(qs);
        setUsedIds(room.usedIds || usedIds);
        startQuestion(nextRound, 0);
        setScreen("playing");
      }
    }, 2000);
  };

  const handleNextRound = async () => {
    const nextRound = currentRoundRef.current + 1;
    if (nextRound >= MAX_ROUNDS) { setScreen("finalResult"); return; }
    if (roundLoser === "tie") {
      const newUsed = { ...usedIds };
      const newQs = drawRoundQuestions(currentTopic, newUsed[currentTopic] || []);
      newUsed[currentTopic] = [...(newUsed[currentTopic] || []), ...newQs.map(q => q.id)];
      const code = roomCodeRef.current;
      await Promise.all([
        setRoomField(code, "usedIds", newUsed),
        setRoomField(code, `roundTopics/${nextRound}`, currentTopic),
        setRoomField(code, `roundQuestions/${nextRound}`, newQs.map(q => q.id)),
        setRoomField(code, "topicPick", { round: nextRound, topic: currentTopic, timestamp: Date.now() }),
      ]);
      roundQuestionsRef.current = newQs;
      setUsedIds(newUsed);
      setRoundQuestions(newQs);
      startQuestion(nextRound, 0);
      setScreen("playing");
    }
  };

  const handlePlayAgain = async () => {
    clearInterval(pollRef.current);
    clearInterval(timerRef.current);

    const code = roomCodeRef.current;
    const name = playerName;
    const isCreatorPlayer = isCreatorRef.current;

    // Reset local state
    myAnswersRef.current = {};
    setMyAnswers({});
    setScores({ me: 0, them: 0 });
    setRoundResults([]);
    setShowCodeBanner(false);
    setInviteCopied(false);
    setRoundLoser(null);
    setTopicRevealTopic(null);
    setCurrentQSelected(null);

    if (code && name) {
      saveSession(name, code);
      // Reuse the same room — reset game data but keep both players linked
      const initUsed = {};
      TOPIC_NAMES.forEach(t => { initUsed[t] = []; });
      await Promise.all([
        setRoomField(code, "answers", {}),
        setRoomField(code, "roundTopics", {}),
        setRoomField(code, "roundQuestions", {}),
        setRoomField(code, "usedIds", initUsed),
        setRoomField(code, "topicPick", null),
        setRoomField(code, "rematch", { requestedBy: name, timestamp: Date.now() }),
      ]);

      if (isCreatorPlayer) {
        // Creator goes to spin screen for new series
        setPendingCreatorName(name);
        setScreen("topicPickerFirst");
      } else {
        // Joiner waits for creator to spin
        setScreen("joinerWaiting");
        pollRef.current = setInterval(async () => {
          const r = await loadRoomData(code);
          if (!r) return;
          const allQs = Object.values(TOPICS).flatMap(t => t.questions);
          const t = r.roundTopics ? r.roundTopics[0] : null;
          const q = t ? (r.roundQuestions[0] || []).map(id => allQs.find(x => x.id === id)).filter(Boolean) : [];
          if (t && q.length >= QUESTIONS_PER_ROUND) {
            clearInterval(pollRef.current);
            const used = r.usedIds || initUsed;
            roundQuestionsRef.current = q;
            setCurrentTopic(t);
            setRoundQuestions(q);
            setUsedIds(used);
            setTopicRevealTopic(t);
            setScreen("topicReveal");
          }
        }, 2000);
      }
    } else {
      clearSession(code);
      setPendingCreatorName("");
      setScreen("home");
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  if (sessionRestoring) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ color: C.accent, fontSize: 32, marginBottom: 12 }}>⚖️</div>
        <div style={{ color: C.muted, fontSize: 13 }}>Loading…</div>
      </div>
    </div>
  );

  if (screen === "home") return <HomeScreen onCreateGame={handleCreateGame} onJoinGame={handleJoinGame} />;

  if (screen === "shareCode") {
    const doCopy = () => {
      const ta = document.getElementById("share-ta");
      const text = ta ? ta.value : "";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => { try { if (ta) { ta.select(); document.execCommand("copy"); } } catch {} });
      } else { try { if (ta) { ta.select(); ta.setSelectionRange(0, 99999); document.execCommand("copy"); } } catch {} }
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2500);
    };
    return <ShareCodeScreen creatorName={playerName} roomCode={roomCode} onSpin={handleGoSpin} inviteCopied={inviteCopied} onCopy={doCopy} />;
  }

  if (screen === "topicPickerFirst")
    return <SpinWheelScreen pickerName={playerName} isFirstRound onTopicChosen={handleFirstTopicChosen} />;

  if (screen === "topicPicker")
    return <SpinWheelScreen pickerName={playerName} onTopicChosen={handleTopicChosen} />;

  if (screen === "joinerWaiting")
    return <JoinerWaitingScreen creatorName={opponentName} onBackToLobby={() => { clearInterval(pollRef.current); setScreen("home"); }} />;

  if (screen === "topicReveal")
    return <TopicRevealScreen creatorName={opponentName} topic={topicRevealTopic} onReady={handleJoinerReady} />;

  if (screen === "waitingForTopic") {
    const loserDisplayName = roundLoser === "them" ? playerName : opponentName;
    return <WaitingForTopicScreen loserName={loserDisplayName} onBackToLobby={() => { clearInterval(pollRef.current); setScreen("home"); }} />;
  }

  if (screen === "playing") {
    const q = roundQuestions[currentQ];
    if (!q) return null;
    return (
      <QuestionScreen
        question={q}
        questionNum={currentQ + 1}
        totalQuestions={QUESTIONS_PER_ROUND}
        onAnswer={(letter) => handleAnswer(letter, currentRound, currentQ)}
        timeLeft={timeLeft}
        selectedAnswer={currentQSelected}
        waitingForOpponent={waitingForOpponent}
        topic={currentTopic}
        isLastQuestion={currentQ === QUESTIONS_PER_ROUND - 1}
        onAdvance={() => startQuestion(currentRound, currentQ + 1)}
        onBackToLobby={waitingForOpponent ? () => { clearInterval(pollRef.current); setScreen("home"); } : null}
      />
    );
  }

  if (screen === "roundResult") {
    const isGameOver = currentRound + 1 >= MAX_ROUNDS;
    const iAmLoser   = roundLoser === "me";
    const iAmWinner  = roundLoser === "them";
    return (
      <RoundResultScreen
        roundResults={roundResults}
        playerName={playerName}
        opponentName={opponentName || "Opponent"}
        scores={scores}
        currentTopic={currentTopic}
        roundWinner={roundLoser}
        myName={playerName}
        isLoser={iAmLoser}
        isGameOver={isGameOver}
        onNextRound={handleNextRound}
        onBackToLobby={() => { clearInterval(pollRef.current); setScreen("home"); }}
        onPickTopic={() => {
          if (iAmLoser) handlePickTopic();
          else if (iAmWinner) handleWinnerWaitsForTopic();
          else handleNextRound();
        }}
      />
    );
  }

  if (screen === "finalResult") {
    const handleEndGame = async () => {
      const code = roomCodeRef.current;
      // Delete from Firebase
      try { await fetch(`${FB_URL}/rooms/${code}.json`, { method: "DELETE" }); } catch {}
      // Remove from localStorage lobby
      removeSession(code);
      clearInterval(pollRef.current);
      clearInterval(timerRef.current);
      myAnswersRef.current = {};
      setMyAnswers({});
      setScores({ me: 0, them: 0 });
      setRoundResults([]);
      setRoundLoser(null);
      setTopicRevealTopic(null);
      setPendingCreatorName("");
      setCurrentQSelected(null);
      setRoomCodeBoth("");
      setScreen("home");
    };
    return (
      <FinalResultScreen
        playerName={playerName}
        opponentName={opponentName || "Opponent"}
        scores={scores}
        onPlayAgain={handlePlayAgain}
        onBackToLobby={() => { clearInterval(pollRef.current); setScreen("home"); }}
        onEndGame={handleEndGame}
      />
    );
  }

  return null;
}
