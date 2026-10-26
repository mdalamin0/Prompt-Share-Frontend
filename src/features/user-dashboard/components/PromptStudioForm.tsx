"use client";

import React, { useState, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { Sparkles, Variable, Code2, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { createPromptValidationSchema } from "../user.schema";
import { categoryType, IPromptFormData } from "../user.types";


interface PromptStudioFormProps {
  mode: "create" | "edit";
  initialData?: IPromptFormData;
  onSubmit: (values: IPromptFormData) => void;
  isPending: boolean;
}

export default function PromptStudioForm({ mode, initialData, onSubmit, isPending }: PromptStudioFormProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const getInitialVariables = () => {
    if (!initialData?.template) return [];
    const matches = Array.from(
      initialData.template.matchAll(/\{\{([^}]+)\}\}/g),
      (m) => m[1].trim(),
    );
    return Array.from(new Set(matches));
  };

  const [detectedVariables, setDetectedVariables] = useState<string[]>(
    getInitialVariables(),
  );
  const [customVarInput, setCustomVarInput] = useState("");

  const preDefinedVariables = [
    "role",
    "framework",
    "code",
    "language",
    "topic",
  ];


const form = useForm({
  defaultValues: {
    title: initialData?.title || "",
    description: initialData?.description || "",
    template: initialData?.template || "",
    category: (initialData?.category || "code") as categoryType,
    tags: initialData?.tags ? initialData.tags.join(", ") : "",
    isPublic: initialData?.isPublic ?? true,
  } as Omit<IPromptFormData, "tags"> & { tags: string },
  validators: {
    onSubmit: createPromptValidationSchema,
  },
  onSubmit: async ({ value }) => {
    const cleanTagsArray =
      typeof value.tags === "string" && value.tags.trim() !== ""
        ? value.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag !== "")
        : [];

    onSubmit({
      title: value.title,
      description: value.description,
      template: value.template,
      category: value.category as categoryType,
      isPublic: value.isPublic,
      tags: cleanTagsArray, 
    });

    form.reset();
    setDetectedVariables([]);
  },
});



  const handleTemplateChange = (
    value: string,
    fieldChangeFn: (v: string) => void,
  ) => {
    fieldChangeFn(value);
    if (value) {
      const matches = Array.from(value.matchAll(/\{\{([^}]+)\}\}/g), (m) =>
        m[1].trim(),
      );
      setDetectedVariables(Array.from(new Set(matches)));
    } else {
      setDetectedVariables([]);
    }
  };

  const injectVariable = (
    varName: string,
    currentVal: string,
    setVal: (v: string) => void,
  ) => {
    const tx = textareaRef.current;
    const token = `{{${varName.trim().toLowerCase()}}}`;
    if (tx) {
      const start = tx.selectionStart;
      const end = tx.selectionEnd;
      const newVal =
        currentVal.substring(0, start) +
        token +
        currentVal.substring(end, currentVal.length);

      handleTemplateChange(newVal, setVal);

      setTimeout(() => {
        tx.focus();
        tx.setSelectionRange(start + token.length, start + token.length);
      }, 0);
    } else {
      handleTemplateChange(`${currentVal} ${token}`, setVal);
    }
  };




  return (
    <div className="w-full bg-card text-card-foreground border border-border/60 p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
          <Sparkles size={18} className="animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground capitalize tracking-tight">
            {mode} Prompt Template
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure your modular production-ready prompt workspace.
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.Field name="title">
              {(field) => (
                <Field className="md:col-span-2">
                  <FieldLabel htmlFor={field.name}>Prompt Title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g., Production Bug Hunter"
                    className="h-11 pl-4"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="category">
              {(field) => (
                <Field className="md:col-span-1">
                  <FieldLabel htmlFor={field.name}>Category Model</FieldLabel>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as any)}
                    className="h-11 w-full bg-background border border-border px-3 text-sm focus:ring-1 focus:ring-primary text-foreground capitalize"
                  >
                    <option value="code">code</option>
                    <option value="text">text</option>
                    <option value="image">image</option>
                  </select>
                </Field>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Short Summary Description
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe the utility of this model..."
                  className="h-11 pl-4"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
          <form.Field name="template">
            {(field) => (
              <Field>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel htmlFor={field.name} className="mb-0">
                    Prompt Template Script
                  </FieldLabel>
                  <span className="text-[10px] text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Code2 size={10} /> Modular Studio
                  </span>
                </div>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  ref={(el) => {
                    textareaRef.current = el;
                  }}
                  onChange={(e) =>
                    handleTemplateChange(e.target.value, field.handleChange)
                  }
                  placeholder="Act as a Senior {{role}} Developer. Analyze {{code}}."
                  className="w-full min-h-[140px] p-4 bg-muted/30 border border-border font-mono text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed rounded-none"
                />
                <FieldError errors={field.state.meta.errors} />

                <div className="p-4 bg-secondary/20 border border-border mt-3 rounded-none">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Variable size={13} className="text-primary" />
                    <span className="text-[11px] font-bold text-foreground uppercase tracking-widest">
                      Prompt Reusability Studio
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-3">
                    Place cursor inside textarea above and click button below to
                    inject tokens.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {preDefinedVariables.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() =>
                          injectVariable(
                            v,
                            field.state.value,
                            field.handleChange,
                          )
                        }
                        className="text-xs font-mono px-2.5 py-1 bg-card hover:bg-primary/15 text-foreground hover:text-primary border border-border hover:border-primary/30 transition-all font-semibold flex items-center gap-1"
                      >
                        <Plus size={10} /> {"{"}
                        {v}
                        {"}"}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 max-w-sm">
                    <Input
                      type="text"
                      value={customVarInput}
                      onChange={(e) => setCustomVarInput(e.target.value)}
                      placeholder="e.g., tone, persona"
                      className="h-8 text-xs pl-3"
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (customVarInput.trim()) {
                          injectVariable(
                            customVarInput,
                            field.state.value,
                            field.handleChange,
                          );
                          setCustomVarInput("");
                        }
                      }}
                      className="h-8 bg-primary text-primary-foreground text-xs font-semibold px-3 shrink-0"
                    >
                      Inject Variable
                    </Button>
                  </div>
                </div>

                {detectedVariables.length > 0 && (
                  <div className="p-4 bg-primary/5 border border-primary/10 mt-3 rounded-none">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Variable size={13} /> Auto-Detected Variables
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {detectedVariables.map((v) => (
                        <span
                          key={v}
                          className="text-xs font-mono px-2.5 py-1 bg-background text-foreground border border-border font-semibold"
                        >
                          {"{"}
                          {v}
                          {"}"}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </Field>
            )}
          </form.Field>
          <form.Field name="tags">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Metadata Repository Tags
                </FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter tags separated by commas (e.g. nodejs, typescript, performance)"
                  className="h-11 pl-4"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="isPublic">
            {(field) => (
              <div className="flex items-center justify-between p-4 bg-muted/20 border border-border/60 rounded-xl mt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    Publicly Release
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Make this template available for global discovery.
                  </span>
                </div>
                <input
                  type="checkbox"
                  id={field.name}
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="size-4 accent-primary cursor-pointer rounded"
                />
              </div>
            )}
          </form.Field>

          <div className="pt-2 w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/5 transition-transform hover:-translate-y-0.5"
            >
              {isPending ? (
                <>
                  <Spinner className="w-4 h-4 text-primary-foreground" />{" "}
                  Deploying Workspace...
                </>
              ) : (
                <>
                  <Save size={15} /> Save and Deploy Prompt
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
