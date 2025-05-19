'use client';
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
  KBarResults,
  useMatches,
  ActionImpl,
} from "kbar";
import { ReactNode, useEffect } from "react";

export default function KWrapper({ children }:{ children: ReactNode }) {
  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      icon: <span className="text-amber-500">🏠</span>,
      keywords: "home mybla",
      perform: () => (window.location.pathname = ""),
    },
    {
      id: "catalog",
      name: "Course Catalog",
      shortcut: ["c"],
      icon: <span className="text-amber-500">📚</span>,
      keywords: "course catalog courses classes",
      perform: () => (window.location.pathname = "catalog"),
    },
    {
      id: "opportunities",
      name: "Opportunity Catalog",
      icon: <span className="text-amber-500">💼</span>,
      shortcut: ['o', 'ec', 'ecs'],
      keywords: "opportunity extracurricular clubs jobs internships summer programs",
      perform: () => (window.location.pathname = "opportunities"),
    },
  ]

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="bg-black/50 backdrop-blur-sm z-50">
          <KBarAnimator className="w-full max-w-lg rounded bg-white overflow-hidden relative">
            <KBarSearch className="w-full rounded text-lg !border-0 !ring-0 !outline-none py-5 px-4" placeholder="Type a command or search..." />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}

function RenderResults() {
  const { results } = useMatches() as { results: ActionImpl[]};

  return (
    <KBarResults
      items={results as ActionImpl[]}
      onRender={({ item, active }: { item: string | ActionImpl; active: boolean }) => (
        typeof item === "string" ? (
          <div className={`p-5 border-l-2 transition ${active ? 'border-amber-400 bg-amber-300/20' : 'border-white'}`}>
            {item}
          </div>
        ) : (
          <div
            className={`p-5 flex items-center gap-4 border-l-2 transition ${active ? 'border-amber-400 bg-amber-300/20' : 'border-white'}`}
          >
            {item.icon} {item.name}
          </div>
        )
      )}
    />
  );
}