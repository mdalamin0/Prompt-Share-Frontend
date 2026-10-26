"use client";

import React, { useState } from "react";
import { X, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface VariableModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateText: string;
  variables: string[];
  onConfirm: (compiledPrompt: string) => void;
}

export default function VariableModal({
  isOpen,
  onClose,
  templateText,
  variables,
  onConfirm,
}: VariableModalProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variables.forEach((v) => {
      initial[v] = "";
    });
    return initial;
  });

  if (!isOpen) return null;

  const handleInputChange = (variable: string, value: string) => {
    setValues((prev) => ({ ...prev, [variable]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let compiled = templateText;

    // {{variable}} টোকেনগুলো ইউজারের ইনপুট ভ্যালু দিয়ে রিপ্লেস করার মেকানিজম
    variables.forEach((v) => {
      const regex = new RegExp(`{{${v}}}`, "g");
      compiled = compiled.replace(regex, values[v].trim() || `[${v}]`);
    });

    onConfirm(compiled);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-md p-4 select-none">
      <div className="bg-card text-card-foreground border border-border/60 max-w-md w-full rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in">
        <div className="p-5 border-b border-border/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-xl shrink-0">
              <Sparkles size={14} />
            </div>
            <div>
              <h3 className="text-xs font-black text-foreground tracking-tight uppercase">
                Inject Schema Parameters
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Fill out your custom prompt variables to bootstrap engine.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 border border-border/40 bg-background text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-5">
          <FieldGroup className="gap-4">
            <div className="max-h-[220px] overflow-y-auto pr-1 space-y-4 [scrollbar-width:thin]">
              {variables.map((v) => (
                <Field key={v}>
                  <FieldLabel className="capitalize font-bold text-foreground">
                    Variable: {v}
                  </FieldLabel>
                  <Input
                    type="text"
                    required
                    value={values[v]}
                    onChange={(e) => handleInputChange(v, e.target.value)}
                    placeholder={`Enter value for {{${v}}}`}
                    className="h-10 text-xs pl-3"
                  />
                </Field>
              ))}
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-end gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-9 text-xs font-semibold px-4 border-border bg-transparent text-foreground hover:bg-accent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 bg-primary text-primary-foreground text-xs font-bold px-4 flex items-center gap-1.5 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Play size={11} strokeWidth={3} />
                <span>Compile & Test Sandbox</span>
              </Button>
            </div>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
