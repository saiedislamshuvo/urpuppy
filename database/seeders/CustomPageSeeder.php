<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\User;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Database\Seeder;

class CustomPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $good_breeder = '

        <h3><strong>Identifying a Good Breeder: What to Look For</strong></h3><p><br></p><p>When considering adding a new puppy to your family, one of the most important decisions you’ll face is choosing a responsible breeder. Working with a reputable breeder can lead to a lifetime of joy with a healthy, well-adjusted dog, while an unethical source may result in various complications, including health issues and behavioral problems. Here’s a comprehensive guide to help you identify a good breeder and understand the qualities that contribute to responsible breeding practices.</p><p><br></p><p>Key Characteristics of a Responsible Breeder</p><p><br></p><p><strong>1. Commitment to Health and Well-Being:</strong></p><ul><li>&nbsp;A good breeder prioritizes the physical and emotional health of their dogs and puppies. They conduct health screenings and testing to ensure that parent dogs are free from hereditary conditions and that puppies are well cared for throughout their early development.</li></ul><p><br></p><p><strong>2. Ethical Breeding Practices:</strong></p><ul><li>&nbsp;Responsible breeders follow established breeding practices and adhere to a code of ethics. They maintain compliance with industry standards, including breed-specific health testing requirements.</li></ul><p><br></p><p><strong>3. Transparent About Operations:</strong></p><ul><li>&nbsp;A reputable breeder should be open and transparent about their breeding program. They welcome questions regarding their practices and provide documentation related to health testing and the overall care of their animals.</li></ul><p><br></p><p><strong>&nbsp;4. Quality Breeding Environment:</strong></p><ul><li>&nbsp;The housing environment should be clean, safe, and conducive to the dogs’ well-being. Good breeders provide a nurturing space that allows socialization and stimulation for puppies, especially during critical development periods.</li></ul><p><br></p><p><strong>&nbsp;5.&nbsp; Socialization and Early Training:</strong></p><ul><li>&nbsp;Puppies should be properly socialized during their early weeks, allowing them to be exposed to a variety of people, animals, noises, and environments. This helps ensure they develop into well-adjusted pets.</li></ul><p><br></p><p><strong>&nbsp;6. Lifelong Commitment to Their Dogs:</strong></p><ul><li>Good breeders take responsibility for their dogs throughout their lives. They have policies in place for accepting dogs back if necessary and will ensure that any rehoming is handled with care.</li></ul><p><br></p><p><strong>&nbsp;7. Education and Ongoing Learning:</strong></p><ul><li>Responsible breeders are committed to continuous education regarding best practices in health care, breeding, and training. They stay informed about advancements in veterinary science and dog care.</li></ul><p><br></p><p><strong>&nbsp;8.&nbsp; Focus on Buyer Education:</strong></p><ul><li>A good breeder openly shares information with potential buyers about the breed, its needs, and any specific health considerations. They ensure that buyers are well-informed and prepared for puppy ownership.</li></ul><p>&nbsp;&nbsp;</p><p><strong>Questions to Ask a Breeder</strong></p><p>When speaking with potential breeders, feel empowered to ask a range of questions to gauge their practices and determine if they are the right fit for you:</p><p><br></p><ul><li>&nbsp;What health tests have been conducted on the sire and dam?</li><li>&nbsp;How do you prioritize socialization for your puppies?</li><li>&nbsp;Can you provide references from previous buyers?</li><li>&nbsp;What is your return policy if I am unable to keep the dog?</li><li>&nbsp;How do you determine if a puppy is a good fit for a specific home?</li><li>&nbsp;What support do you offer new puppy owners after the sale?</li></ul><p>&nbsp;&nbsp;</p><p><strong>Final Thoughts</strong></p><p>&nbsp;&nbsp;</p><p>Finding a good breeder requires careful consideration and due diligence. Look for breeders who treat their dogs like family, adhere to high standards of care, and have a clear commitment to the health and happiness of their dogs. Remember that responsible breeding contributes to creating healthy, well-adjusted puppies that will flourish in their new homes.</p><p>&nbsp;&nbsp;</p><p>Using the insights shared above, you can approach the process of choosing a breeder with confidence, ensuring that you select someone who aligns with your values and meets the best practices for raising healthy and happy dogs. With the right breeder, you’re setting a strong foundation for a loving relationship with your new furry family member.</p>

        ';

        $why_list = "
        <p>Listing your dog breeding services on <strong>Urpuppy.com</strong> provides numerous benefits that can greatly enhance your business visibility and customer engagement. Here’s a concise overview of the features and advantages:</p><p><br></p><p>&nbsp;Here’s why you should list your dog breeding business in our directory:</p><p><br></p><ol><li><strong>Targeted Exposure</strong>: Connect with pet enthusiasts who are specifically searching for the breed you specialize in, ensuring your listings reach dedicated buyers.</li><li><strong>Reputable Platform</strong>: Being part of a trusted directory boosts your credibility and professional standing, making you a more appealing choice for potential customers.</li><li><strong>Optimized Marketing</strong>: The platform is tailored to effectively showcase your puppies and services, simplifying the process for customers to discover your offerings.</li><li><strong>Direct Communication</strong>: Utilize built-in messaging and inquiry tools to engage directly with potential clients, fostering better interactions.</li><li><strong>Boosted Listings</strong>: Benefit from enhanced visibility, as search features prioritize quality breeders, improving your chances of being seen.</li></ol><p>&nbsp;</p><p><br></p><p>Additionally, you can upload images and videos of your puppies and dogs, share your company's information, and promote your website and social media accounts. This multimedia support helps attract more customers by showcasing your breed and creating a personal connection. Overall, listing on <strong>Urpuppy.com </strong>streamlines the breeding process and maximizes your outreach to interested buyers.</p>

        ";

        $terms = '

        <h3>1. Acceptance of Terms</h3><p>By accessing and using UrPuppy.com you agree to comply with and be bound by<br>the following terms and conditions. If you do not agree with these terms, please<br>do not use our website.</p><h3>2. Eligibility</h3><p>You must be at least 18 years old to use this website. By accessing the website,<br>you affirm that you are of legal age to enter into this agreement.</p><h3>3. User Responsibilities</h3><p>You are responsible for ensuring that all information you provide is accurate and<br>up to date.<br>You agree not to use the website for any illegal purposes, including but not<br>limited to posting unlawful content, engaging in fraudulent activity, or violating the<br>intellectual property rights of others.<br>Any inappropriate content, spam, or offensive language is strictly prohibited.</p><h3>4. User-Generated Content</h3><p>Users may upload content (e.g., listings, reviews, etc.) to the website.<br>You grant Urpuppy.com a non-exclusive, royalty-free license to use, display, and<br>distribute this content.<br>You are solely responsible for the content you post and must ensure it complies<br>with our community standards.</p><h3>5. Prohibited Activities</h3><p>Users agree not to engage in:<br>Any form of harassment, abuse, or impersonation of others.<br>Posting content that is harmful, false, or misleading.<br>Using bots or automated systems to access or collect information from the<br>website.</p><h3>6. Intellectual Property</h3><p>All content and materials on the website, including logos, trademarks, text, and<br>images, are the intellectual property of urpuppy.com or its licensors. You may not<br>use or reproduce any content without express permission.</p><h3>7. Third-Party Links</h3><p>Urpuppy.com may contain links to third-party websites. We are not responsible<br>for the content or practices of any third-party websites.</p><h3>8. Limitation of Liability</h3><p>Urpuppy.com will not be liable for any indirect, incidental, or consequential<br>damages resulting from your use of the website.<br>We do not guarantee the accuracy or reliability of any user-generated content or<br>third-party information found on the website.</p><h3>9. Privacy Policy</h3><p>Your use of the website is also governed by our Privacy Policy, which details how<br>we collect, use, and store your information.</p><h3>10. Changes to the Terms</h3><p>We reserve the right to modify these Terms of Use at any time. Any changes will<br>be posted on this page, and your continued use of the website constitutes<br>acceptance of these changes.</p><h3>11. Termination</h3><p>We reserve the right to suspend or terminate your account if you violate<br>these terms or engage in harmful activities.</p><h3>12. Governing Law</h3><p>These Terms of Use will be governed by and construed in accordance with the<br>laws of The United States of American without regard to its conflict of law<br>provisions.</p>

        ';

        $privacy = '
        <h3>Effective Date: 10/1/2024</h3><p>At&nbsp;Urpuppy.com, your privacy is important to us. This Privacy Policy outlines how we<br>collect, use, disclose, and safeguard your information when you visit our website.<br>Please read this policy carefully to understand our practices regarding your personal<br>information.<br>&nbsp;</p><h3>1. Information We Collect</h3><p>We may collect the following types of information:<br>&nbsp;<br><strong>a. Personal Information</strong><br>When you interact with our site, we may ask you to provide certain personally<br>identifiable information, including but not limited to:</p><ul><li>Name</li><li>Email address</li><li>Phone number</li><li>Shipping address</li><li>Billing information (credit card details)</li></ul><p>&nbsp;<br>&nbsp;<br><strong>b. Non-Personal Information</strong><br>We may also collect non-personal information automatically when you visit our site,<br>including:</p><ul><li>IP address</li><li>Browser type</li><li>Pages visited</li><li>Time and date of access</li><li>Referring website</li></ul><p>&nbsp;</p><h3>2. How We Use Your Information</h3><p>We may use the information we collect from you for various purposes, including:</p><ul><li>&nbsp;To process your orders and manage your account</li><li>&nbsp;To improve our website and services</li><li>&nbsp;To communicate with you, including sending confirmations and updates</li><li>&nbsp;To respond to inquiries, customer service requests, and support needs</li><li>&nbsp;To send you marketing communications, if you have opted in to receive them</li><li>To comply with legal obligations and prevent fraud</li></ul><p><br></p><h3>3. Information Sharing</h3><p>We do not sell, trade, or otherwise transfer your personal information to outside parties<br>without your consent, except as required to fulfill your order or as necessary to operate<br>our business. We may share your information with:<br><br></p><ul><li>Service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping companies)</li><li>Complying with legal requirements or regulations</li><li>&nbsp;Protecting our rights or the rights of others</li></ul><p><br></p><h3>4. Cookies</h3><p>Urpuppy.com&nbsp;uses cookies to enhance user experience. Cookies are small text files<br>placed on your device by websites you visit. You can choose to accept or decline<br>cookies through your browser settings. However, declining cookies may prevent you<br>from taking full advantage of our website.</p><h3>&nbsp;<br>5. Data Security</h3><p>We implement a variety of security measures to maintain the safety of your personal<br>information. However, please remember that no method of transmission over the<br>internet or method of electronic storage is 100% secure. While we strive to use<br>commercially acceptable means to protect your personal information, we cannot<br>guarantee its absolute security.<br>&nbsp;</p><h3>6. Your Rights</h3><p>Depending on your jurisdiction, you may have the right to:</p><ul><li>&nbsp;Access, correct, or delete your personal information</li><li>&nbsp;Withdraw consent for processing your personal information</li><li>&nbsp;Object to or restrict processing of your personal information To exercise these rights, please contact us using the information below.</li></ul><p>&nbsp;</p><h3>7. Third-Party Websites</h3><p>Our website may contain links to other websites that are not operated by us. If you click<br>on a third-party link, you will be directed to that third party’s site.</p>

        ';

        $user = User::query()->where('email', 'admin@urpuppy.com')->first();

        $page_good_breeder = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'How to Identify a Good Breeder',
            'description' => 'good breeder',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => $good_breeder,
            'post_type' => 'page',
            'ordering' => 4,
        ]);

        $page_why_list = Page::create([
            'user_id' => $user->id,
            'title' => $name = "Why List on Our Breeder's Directory?",
            'description' => 'Why List on Our Breeders Directory?',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => $why_list,
            'post_type' => 'page',
            'ordering' => 6,
        ]);

        $page_terms = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Terms & Conditions',
            'description' => 'Terms & Conditions',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => $terms,
            'post_type' => 'page',
            'ordering' => 7,
        ]);

        $page_privacy = Page::create([
            'user_id' => $user->id,
            'title' => $name = 'Privacy Policy',
            'description' => 'Privacy Policy',
            'published_at' => now(),
            'slug' => SlugService::createSlug(Page::class, 'slug', $name),
            'content' => $privacy,
            'post_type' => 'page',
            'ordering' => 7,
        ]);
        $items = [];

        $items[] = [
            'id' => str()->uuid(),
            'label' => $page_good_breeder->title,
            'type' => 'page_link',
            'data' => [
                'page_id' => $page_good_breeder->id,
            ],
            'children' => [],
        ];

        $items[] = [
            'id' => str()->uuid(),
            'label' => $page_why_list->title,
            'type' => 'page_link',
            'data' => [
                'page_id' => $page_why_list->id,
            ],
            'children' => [],
        ];

        $items[] = [
            'id' => str()->uuid(),
            'label' => $page_terms->title,
            'type' => 'page_link',
            'data' => [
                'page_id' => $page_terms->id,
            ],
            'children' => [],
        ];

        $items[] = [
            'id' => str()->uuid(),
            'label' => $page_privacy->title,
            'type' => 'page_link',
            'data' => [
                'page_id' => $page_privacy->id,
            ],
            'children' => [],
        ];

        /* Navigation::create([ */
        /*     'name' => 'Footer Links 2', */
        /*     'handle' => 'footer-links-2', */
        /*     'items' => $items */
        /* ]); */

    }
}
