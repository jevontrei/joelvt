"use client";

import Link from "next/link";

// import MyBooks from "@/components/my-books";
// import SearchBooksForm from "@/components/search-books-form";

// default export
export default function Page() {
  return (
    <div className="flex flex-col items-center w-max px-12">
      <div className="flex flex-col items-center">
        <h3 className="text-4xl my-8 mx-4 pt-2">Books read in 2026</h3>
        <ul className="p-2 flex flex-col items-center">
          <li className="pb-1">The Hobbit</li>
          <li className="pb-1">
            The Lord of the Rings: The Fellowship of the Ring
          </li>
          <li className="pb-1">The Lord of the Rings: The Two Towers</li>
          <li className="pb-1">
            The Lord of the Rings: The Return of the King (in progress)
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-4xl my-8 mx-4 pt-2">Audiobooks in 2026</h3>
        <ul className="p-2 flex flex-col items-center">
          <li className="pb-1">Gravity Let Me Go</li>
        </ul>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-4xl my-8 mx-4 pt-2">Online reading in 2026</h3>
        <p className="pb-4">
          (I keep track of online reading with{" "}
          <Link
            className="underline"
            href="https://quiver.markopteryx.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiver
          </Link>
          )
        </p>

        <ul className="p-2 flex flex-col items-center">
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://doc.rust-lang.org/book/"
            >
              The Rust Programming Language (in progress)
            </Link>
          </li>

          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://markopteryx.dev/posts/2025-reading/"
            >
              Best things I read in 2025 (in progress)
            </Link>
          </li>

          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.cnbc.com/2026/04/15/allbirds-bird-stock-shoes-ai.html"
            >
              Struggling shoe retailer Allbirds makes bizarre pivot to AI, adds
              $127 million in value
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.paulgraham.com/nerds.html"
            >
              Why Smart Kids Are Unpopular: Intelligence vs. Social Life
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://burntsushi.net/unwrap/"
            >
              Using unwrap() in Rust: Error Handling Best Practices
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://scholarstage.substack.com/p/china-and-the-future-of-science?utm_source=post-email-title&publication_id=1198317&post_id=191704966&utm_campaign=email-post-title&isFreemail=true&r=5rmifv&triedRedirect=true&utm_medium=email"
            >
              China&apos;s Ambition: Leading the Next Techno-Scientific
              Revolution
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.cockroachlabs.com/blog/what-is-connection-pooling/"
            >
              Understanding and Sizing Database Connection Pools
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://endler.dev/2026/personal-blog/"
            >
              Why Now is the Time to Start Writing a Personal Blog
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.andrewyang.com/p/the-end-of-the-office"
            >
              Forecast: AI&apos;s impact on white-collar jobs and the economy
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.oneusefulthing.org/p/a-guide-to-which-ai-to-use-in-the?hide_intro_popup=true"
            >
              AI Models, Apps, and Harnesses: A Guide to AI Usage
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="http://bach.ai/dont-be-that-reptile/"
            >
              Don’t be that Reptile - Joscha Bach
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://siraj-samsudeen.medium.com/building-my-own-grep-with-codecrafters-f20a7aba8ad2"
            >
              Building my own grep with codecrafters | by Siraj Samsudeen |
              Medium
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.hankgreen.com/crc"
            >
              Something is Going on with Colorectal Cancer
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.jeetmehta.com/posts/thrive-in-obscurity"
            >
              Thrive in obscurity
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://onecloudplease.com/blog/s3-bucket-namesquatting"
            >
              S3 Bucket Namesquatting: Abusing Predictable AWS Naming Patterns
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="http://bach.ai/the-plight-of-nerds/"
            >
              The plight of nerds - Joscha Bach
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://users.rust-lang.org/t/from-tony-hoare-to-graydon-hoare/132033"
            >
              From Tony Hoare to Graydon Hoare - The Rust Programming Language
              Forum
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://paulgraham.com/progbot.html"
            >
              Programming Bottom-Up
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.separateconcerns.com/2023-09-11-linear-code.html"
            >
              Improving Code Readability: Linearity vs. Abstraction
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://minds.md/zakirullin/cognitive"
            >
              Cognitive Load and Software Architecture Principles
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seangoedecke.com/addicted-to-being-useful/"
            >
              The Addiction to Usefulness in Software Engineering
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://endler.dev/2025/best-programmers/"
            >
              Traits of Exceptional Programmers and Developers
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seangoedecke.com/generate-skills-afterwards/#fnref-1"
            >
              LLM-generated skills work, if you generate them afterwards
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://samhenri.gold/blog/20260312-this-is-not-the-computer-for-you/"
            >
              “This Is Not The Computer For You” · Sam Henri Gold
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://lists.freebsd.org/pipermail/freebsd-current/2010-August/019310.html"
            >
              Why GNU grep is fast: Optimization techniques for text searching
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://matklad.github.io/2020/07/15/two-beautiful-programs.html"
            >
              Two Beautiful Rust Programs
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ducktyped.org/p/a-mini-book-on-aws-networking-introduction"
            >
              AWS Networking Basics: A Mini-book Guide
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seangoedecke.com/getting-the-main-thing-right/#fnref-3"
            >
              Identifying the &apos;Main Thing&apos;: A Guide to Focus in Tech
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://jyn.dev/the-core-of-rust/"
            >
              The Interwoven Core of Rust&apos;s Design
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://sharif.io/anna-alexei"
            >
              The power of inclusion: A reflection on college friendships
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://onecloudplease.com/blog/bucketsquatting-is-finally-dead"
            >
              AWS S3 Namespaces: Preventing Bucketsquatting Attacks
            </Link>
          </li>
          <li className="pb-1">
            <Link
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.afr.com/technology/ai-gives-graduates-an-edge-opening-new-career-pathways-20260206-p5o08c"
            >
              How AI is Accelerating Careers for Graduates in Professional
              Services
            </Link>
          </li>
        </ul>
      </div>

      {/* <SearchBooksForm />
      <MyBooks /> */}
    </div>
  );
}
