import {
    Express,
    Figma,
    GitIcon,
    GithubIcon,
    Java,
    Javascript,
    JetbrainsIcon,
    MicrosoftTeams,
    MongodbIcon,
    Mysql,
    Nestjs,
    NodejsIcon,
    Postgresql,
    TailwindIcon,
    Trello,
    TypescriptIcon,
    VisualStudioCode,
    _React as ReactIcon,
} from "@dev.icons/react";
import StackIcon from "./StackIcon";

export default function Stack() {
    return(
        <>
            <div className="flex flex-col gap-y-3 overflow-visible">
                <div className="flex flex-col gap-y-1">
                     <span className="text-xs font-light secondary-text-color">FRONTEND</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-8 overflow-visible py-1 pb-3">
                        <StackIcon name="Javascript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                            <Javascript size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="TypeScript" href="https://www.typescriptlang.org/">
                            <TypescriptIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="React" href="https://react.dev/">
                            <ReactIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Tailwind CSS" href="https://tailwindcss.com/">
                            <TailwindIcon size={40} className="rounded-md" />
                        </StackIcon>
                    </div>
                </div>

                <div className="flex flex-col gap-y-1">
                     <span className="text-xs font-light secondary-text-color">BACKEND</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-8 overflow-visible py-1 pb-10">
                        <StackIcon name="Node.js" href="https://nodejs.org/">
                            <NodejsIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Express.js" href="https://expressjs.com/">
                            <Express size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="NestJS" href="https://nestjs.com/">
                            <Nestjs size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Java" href="https://dev.java/">
                            <Java size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="MongoDB" href="https://www.mongodb.com/">
                            <MongodbIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="PostgreSQL" href="https://www.postgresql.org/">
                            <Postgresql size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="MySQL" href="https://www.mysql.com/">
                            <Mysql size={40} className="rounded-md" />
                        </StackIcon>
                    </div>
                </div>

                <div className="flex flex-col gap-y-1">
                     <span className="text-xs font-light secondary-text-color">Developer Tools</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-8 overflow-visible py-1 pb-10">
                        <StackIcon name="Git" href="https://git-scm.com/">
                            <GitIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="GitHub" href="https://github.com/">
                            <GithubIcon size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="VS Code" href="https://code.visualstudio.com/">
                            <VisualStudioCode size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Figma" href="https://www.figma.com/">
                            <Figma size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Trello" href="https://trello.com/">
                            <Trello size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="Teams" href="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software">
                            <MicrosoftTeams size={40} className="rounded-md" />
                        </StackIcon>

                        <StackIcon name="JetBrains" href="https://www.jetbrains.com/">
                            <JetbrainsIcon size={40} className="rounded-md" />
                        </StackIcon>
                    </div>
                </div>
            </div>
        </>
    );
}
