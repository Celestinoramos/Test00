import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  User,
  Bell,
  Shield,
  Palette,
  KeyRound,
  Save,
  Users,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";
import { useDocumentTitle } from "@/lib/use-document-title";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

const sections = [
  { id: "institution", label: "Instituição", icon: Building2 },
  { id: "account", label: "Conta", icon: User },
  { id: "users", label: "Usuários", icon: Users },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "api", label: "API & Integrações", icon: KeyRound },
] as const;

type SectionId = (typeof sections)[number]["id"];

function SettingsPage() {
  useDocumentTitle("Configurações");
  const [active, setActive] = useState<SectionId>("institution");

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure as preferências da instituição e da sua conta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="bg-card border border-border rounded-xl p-2 h-fit">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {s.label}
              </button>
            );
          })}
        </aside>

        <div className="bg-card border border-border rounded-xl p-6">
          {active === "institution" && <InstitutionForm />}
          {active === "account" && <AccountForm />}
          {active === "users" && <UsersForm />}
          {active === "notifications" && <NotificationsForm />}
          {active === "security" && <SecurityForm />}
          {active === "appearance" && <AppearanceForm />}
          {active === "api" && <ApiForm />}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-border">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full h-10 px-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function SaveButton() {
  return (
    <div className="flex justify-end pt-2">
      <button className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
        <Save className="size-4" /> Salvar alterações
      </button>
    </div>
  );
}

function InstitutionForm() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Instituição" description="Dados que aparecem nos documentos emitidos." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome da instituição">
          <input className={inputClass} defaultValue="Universidade Agostinho Neto" />
        </Field>
        <Field label="Sigla">
          <input className={inputClass} defaultValue="UAN" />
        </Field>
        <Field label="E-mail de contacto">
          <input className={inputClass} type="email" defaultValue="secretaria@uan.ao" />
        </Field>
        <Field label="Telefone">
          <input className={inputClass} defaultValue="+244 222 000 000" />
        </Field>
      </div>
      <Field label="Endereço">
        <input className={inputClass} defaultValue="Av. 4 de Fevereiro, 123, Luanda" />
      </Field>
      <Field label="Sobre" hint="Texto curto que aparece no rodapé dos documentos.">
        <textarea
          className="w-full min-h-24 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          defaultValue="Instituição de ensino superior dedicada à excelência acadêmica."
        />
      </Field>
      <SaveButton />
    </div>
  );
}

function AccountForm() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Conta" description="As suas informações pessoais." />
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
          A
        </div>
        <div>
          <button className="text-sm font-medium text-primary hover:underline">Enviar foto</button>
          <p className="text-xs text-muted-foreground mt-0.5">JPG ou PNG, máximo 2MB</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome">
          <input className={inputClass} defaultValue="Administrador" />
        </Field>
        <Field label="Sobrenome">
          <input className={inputClass} defaultValue="GCE" />
        </Field>
        <Field label="E-mail">
          <input className={inputClass} type="email" defaultValue="admin@uan.ao" />
        </Field>
        <Field label="Cargo">
          <input className={inputClass} defaultValue="Administrador" disabled />
        </Field>
      </div>
      <SaveButton />
    </div>
  );
}

function Toggle({ defaultChecked }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-primary" : "bg-border"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function NotificationsForm() {
  const items = [
    { label: "Novas emissões", desc: "Receber notificação quando um documento é emitido.", on: true },
    { label: "Validações pendentes", desc: "Avisar sobre pedidos a aguardar revisão.", on: true },
    { label: "Relatório semanal", desc: "Resumo da actividade enviado por e-mail.", on: false },
    { label: "Alertas de segurança", desc: "Tentativas suspeitas de validação.", on: true },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Notificações" description="Escolha o que deseja receber." />
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.label} className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">{i.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{i.desc}</p>
            </div>
            <Toggle defaultChecked={i.on} />
          </li>
        ))}
      </ul>
      <SaveButton />
    </div>
  );
}

function SecurityForm() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Segurança" description="Proteja a sua conta e os documentos emitidos." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Senha actual">
          <input className={inputClass} type="password" placeholder="••••••••" />
        </Field>
        <div />
        <Field label="Nova senha">
          <input className={inputClass} type="password" placeholder="••••••••" />
        </Field>
        <Field label="Confirmar nova senha">
          <input className={inputClass} type="password" placeholder="••••••••" />
        </Field>
      </div>
      <div className="flex items-center justify-between p-4 rounded-lg border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Autenticação de dois factores</p>
          <p className="text-xs text-muted-foreground mt-0.5">Adicione uma camada extra de segurança.</p>
        </div>
        <Toggle defaultChecked />
      </div>
      <SaveButton />
    </div>
  );
}

function AppearanceForm() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  return (
    <div className="space-y-5">
      <SectionHeader title="Aparência" description="Personalize o tema da interface." />
      <div className="grid grid-cols-3 gap-3">
        {(["light", "dark", "system"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`p-4 rounded-lg border-2 transition-colors text-left ${
              theme === t ? "border-primary bg-secondary/50" : "border-border hover:border-primary/40"
            }`}
          >
            <div className={`h-16 rounded-md mb-3 ${
              t === "light" ? "bg-gradient-to-br from-white to-gray-100 border border-border" :
              t === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800" :
              "bg-gradient-to-br from-white to-gray-900"
            }`} />
            <p className="text-sm font-medium text-foreground capitalize">
              {t === "light" ? "Claro" : t === "dark" ? "Escuro" : "Sistema"}
            </p>
          </button>
        ))}
      </div>
      <SaveButton />
    </div>
  );
}

function ApiForm() {
  return (
    <div className="space-y-5">
      <SectionHeader title="API & Integrações" description="Chaves de acesso para sistemas externos." />
      <Field label="Chave da API" hint="Utilize esta chave para validar documentos através de integração externa.">
        <div className="flex gap-2">
          <input className={inputClass} readOnly value="gce_live_••••••••••••3f9a" />
          <button className="h-10 px-4 rounded-lg border border-border text-sm font-medium hover:bg-secondary">
            Copiar
          </button>
        </div>
      </Field>
      <Field label="Webhook URL">
        <input className={inputClass} placeholder="https://o-meu-sistema.ao/webhook" />
      </Field>
      <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-amber-50/50">
        <div>
          <p className="text-sm font-medium text-foreground">Regenerar chave</p>
          <p className="text-xs text-muted-foreground mt-0.5">A chave actual deixará de funcionar imediatamente.</p>
        </div>
        <button className="h-9 px-4 rounded-lg border border-red-300 bg-white text-sm font-medium text-red-700 hover:bg-red-50">
          Regenerar
        </button>
      </div>
      <SaveButton />
    </div>
  );
}

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Emissor" | "Validador" | "Leitor";
  status: "Activo" | "Inactivo";
};

const initialUsers: UserRow[] = [
  { id: "u1", name: "Ana Domingos", email: "ana.domingos@uan.ao", role: "Administrador", status: "Activo" },
  { id: "u2", name: "João Bumba", email: "joao.bumba@uan.ao", role: "Emissor", status: "Activo" },
  { id: "u3", name: "Mariana Capemba", email: "mariana.capemba@uan.ao", role: "Validador", status: "Activo" },
  { id: "u4", name: "Pedro Quitumba", email: "pedro.quitumba@uan.ao", role: "Leitor", status: "Inactivo" },
];

function UsersForm() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRow["role"]>("Leitor");

  function addUser(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setUsers((prev) => [
      ...prev,
      { id: `u${Date.now()}`, name: name.trim(), email: email.trim(), role, status: "Activo" },
    ]);
    setName("");
    setEmail("");
    setRole("Leitor");
    setShowForm(false);
  }

  function removeUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Gestão de Usuários"
        description="Crie, edite e remova contas de usuários do sistema."
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {users.length} {users.length === 1 ? "usuário" : "usuários"} no total
        </p>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="size-4" /> Novo usuário
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addUser}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-secondary/30"
        >
          <Field label="Nome completo">
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Domingos Sebastião"
              required
            />
          </Field>
          <Field label="E-mail">
            <input
              className={inputClass}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@uan.ao"
              required
            />
          </Field>
          <Field label="Função">
            <select
              className={inputClass}
              value={role}
              onChange={(e) => setRole(e.target.value as UserRow["role"])}
            >
              <option value="Administrador">Administrador</option>
              <option value="Emissor">Emissor</option>
              <option value="Validador">Validador</option>
              <option value="Leitor">Leitor</option>
            </select>
          </Field>
          <div className="flex items-end justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="h-10 px-4 rounded-lg border border-border text-sm font-medium hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Criar conta
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60">
            <tr className="text-left">
              <th className="px-4 py-2.5 font-medium text-foreground">Nome</th>
              <th className="px-4 py-2.5 font-medium text-foreground">E-mail</th>
              <th className="px-4 py-2.5 font-medium text-foreground">Função</th>
              <th className="px-4 py-2.5 font-medium text-foreground">Estado</th>
              <th className="px-4 py-2.5 font-medium text-foreground text-right">Acções</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3 text-foreground">{u.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.status === "Activo"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                      title="Editar"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => removeUser(u.id)}
                      className="p-2 rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600"
                      title="Remover"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}