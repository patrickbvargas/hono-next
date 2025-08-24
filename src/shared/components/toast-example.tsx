"use client";

import { toast } from "~/shared/lib/toast";
import { toast as sonnerToast } from "sonner";
import { Button } from "./ui/button";

export function ToastExample() {
  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Toast Test - Portuguese Timestamps</h2>
      
      {/* Default behavior with timestamps */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Behavior (Message + Timestamp)</h3>
        <div className="grid grid-cols-4 gap-4">
          <Button
            onClick={() => toast.success("Operação realizada com sucesso")}
            variant="outline"
          >
            Success
          </Button>

          <Button
            onClick={() => toast.error("Algo deu errado ao processar")}
            variant="outline"
          >
            Error
          </Button>

          <Button
            onClick={() => toast.warning("Verifique os dados antes de continuar")}
            variant="outline"
          >
            Warning
          </Button>

          <Button
            onClick={() => toast.info("Esta é uma informação importante")}
            variant="outline"
          >
            Info
          </Button>
        </div>
      </div>

      {/* Custom configuration examples */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Configuration Examples</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => toast.success("Cliente cadastrado", {
              description: "João Silva foi adicionado ao sistema",
              action: {
                label: "Visualizar",
                onClick: () => toast.info("Abrindo perfil do cliente")
              }
            })}
            variant="outline"
          >
            Success with Action
          </Button>

          <Button
            onClick={() => toast.error("Erro de validação", {
              description: "Email já está sendo usado por outro usuário",
              duration: 8000
            })}
            variant="outline"
          >
            Error with Custom Description
          </Button>

          <Button
            onClick={() => toast.warning("Sistema em manutenção", {
              description: "O sistema será reiniciado em 5 minutos",
              duration: Infinity
            })}
            variant="outline"
          >
            Persistent Warning
          </Button>

          <Button
            onClick={() => toast.info("Nova funcionalidade disponível", {
              description: "Clique para saber mais sobre as novidades",
              action: {
                label: "Saiba Mais",
                onClick: () => toast.success("Redirecionando para documentação")
              }
            })}
            variant="outline"
          >
            Info with Action
          </Button>
        </div>
      </div>

      {/* Additional Sonner features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Sonner Features</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button
            onClick={() => sonnerToast.loading("Processando dados...")}
            variant="outline"
          >
            Loading Toast
          </Button>

          <Button
            onClick={() => {
              const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  Math.random() > 0.5 ? resolve({ name: "Backup" }) : reject(new Error("Falhou"));
                }, 2000);
              });

              sonnerToast.promise(promise, {
                loading: "Criando backup...",
                success: (data: any) => `${data.name} criado com sucesso`,
                error: "Falha ao criar backup",
              });
            }}
            variant="outline"
          >
            Promise Toast
          </Button>

          <Button
            onClick={() => sonnerToast.dismiss()}
            variant="destructive"
          >
            Dismiss All
          </Button>
        </div>
      </div>
    </div>
  );
}
