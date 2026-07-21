"use client";

 
import { Button } from "@/components/ui/button";
import { cn, errorToast } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode, useTransition } from "react";
 

const SuperButton = (props: SuperButtonProps) => {
  return RenderButton(props);
};

export default SuperButton;

const RenderButton = (props: SuperButtonProps) => {
  const { buttonType } = props;

  switch (buttonType) {
    case "linkButton": {
      return <RenderLinkButton {...props}/>;
    }
    case "loadingButton": {
      return <RenderLoadingButton  {...props} />;
    }
  
    case "pushButton": {
      return <RenderPushButton  {...props} />;
    }
   
  }
};

const RenderLinkButton = (
  props: LinkType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType,variant,scroll,replace,target,download, ...rest } = props;

  return (
    <Button {...rest}  className={cn("", className)} variant={variant ?? "site"} asChild >
      <Link scroll={scroll} download={download} className="flex items-center" href={href} replace={replace} target={target} >
        {Icon && Icon}
        {title}
      </Link>
    </Button>
  );
};

const RenderLoadingButton = (
  props: LoadingType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const {
    title,
    clickHandler,
    variant,
    className,
    Icon,
    loading,
    loadingTitle,
    buttonType,
    ...rest
  } = props;
  const showIcon =(Icon && title) || (Icon && !title && !loading)
  return (
    <Button
      {...rest}
      type={props.type ?? "button"}
      variant={variant ?? "site"}
      onClick={async () => (clickHandler ? await clickHandler() : undefined)}
      className={cn("disabled:opacity-55", className)}
      disabled={loading}
    >
      {showIcon && Icon}
      {!!loading && !!loadingTitle ? loadingTitle : title}
      {!!loading && <Loader2 className={cn("ml-3 animate-spin",!title && 'ml-0') }/>}
    </Button>
  );
};

 

const RenderPushButton = (
  props: NormalButton & PushType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType,variant, ...rest } = props;
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const handler = () => {
    startTransition(() => {
      router.push(href,{scroll:false});
    });
  };

  return (
    <Button
    onClick={handler}
      {...rest}
      disabled={pending}
      className={cn("disabled:opacity-55", className)}
      variant={variant ?? "site"}
    >
      {Icon && Icon}
      {title}
      {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

 





//types 

type SuperButtonProps = NormalButton &
  ( LoadingType | LinkType | PushType ) &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingType = {
  buttonType: "loadingButton";
  loadingTitle?: string;
  loading: boolean;
};

type NormalButton = {
  variant?: "default" | "link" | "site" | "destructive" | "outline" | "secondary" | "ghost" | "siteSecondary" |  "siteActive",
  className?: string;
  title?: string;
  clickHandler?: () => Promise<void>;
  Icon?: ReactNode;
};
 

type LinkType = {
  buttonType: "linkButton";
  href: string;
  scroll?:boolean,
  replace?:boolean
  target?: HTMLAttributeAnchorTarget
  download?:boolean
};

type PushType = {
  buttonType: "pushButton";
  href: string;
};

 
