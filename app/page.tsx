import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg pt-20 text-center justify-center">
        <h1 className={title()}>AKI chatbot that leverages&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>context &nbsp;</h1>
        <h1 className={title()}>knowledge retrieval.</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          For enriched, conversational experiences.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/start"
        >
          Start here
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by clicking on&nbsp;
            <Code color="primary">Login</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
