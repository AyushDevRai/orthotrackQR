"use client";
import * as React from "react";
import * as Primitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export const Accordion = Primitive.Root;
export function AccordionItem({ children, ...props }: React.ComponentProps<typeof Primitive.Item>) { return <Primitive.Item className="accordion-item" {...props}>{children}</Primitive.Item>; }
export function AccordionTrigger({ children, ...props }: React.ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Header><Primitive.Trigger className="accordion-trigger" {...props}>{children}<Plus size={20} className="accordion-plus" /></Primitive.Trigger></Primitive.Header>; }
export function AccordionContent({ children, ...props }: React.ComponentProps<typeof Primitive.Content>) { return <Primitive.Content className="accordion-content" {...props}><div>{children}</div></Primitive.Content>; }
