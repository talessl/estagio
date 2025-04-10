import { useEffect, useState } from "react";
import { deleteProcesso, getProcessosPrivados, getProcessosPrivadosCliente, updateProcesso } from "../services/processoServices";
import { listarDocumentosPorProcesso, removerDocumento } from "../services/documentoServices";
import { getUsuariosPorIds } from "../services/usuarioServices";
import { getClientePorUsuarioId, getUsuarioIds } from "../services/clienteServices";
import { createRelation, listarPorProcesso, removerRelacao } from "../services/processoClienteServices";
import EditProcessModal from "../components/EditProcessModal";
import AddClientModal from "../components/AddClientModal";
import RemoveProcessModal from "../components/RemoveProcessModal";
import AddDocumentModal from "../components/AddDocumentModal";
import AddPrazoModal from "../components/AddPrazoModal";
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import DistributeModal from "../components/DistributeProcessModal";
import { criarPrazos, listarPrazosPorProcesso, removerPrazo } from "../services/prazoServices";
import { Trash2 } from "lucide-react";



function Processos() {
  const { tipoUsuario, token } = useAuth();
  const [processos, setProcessos] = useState([]);
  const [selectedProcesso, setSelectedProcesso] = useState(null);
  const [todosProcessos, setTodosProcessos] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [processoParaDocumento, setProcessoParaDocumento] = useState(null);
  const [processoParaPrazo, setProcessoParaPrazo] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalRemoveOpen, setModalRemoveOpen] = useState(false);
  const [modalAddClient, setModalAddClient] = useState(false);
  const [modalDistributeProcess, setModalDistributeProcess] = useState(false);
  const [modalAddDocOpen, setModalAddDocOpen] = useState(false);
  const [modalPrazoOpen, setModalPrazoOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (tipoUsuario !== null) {
      fetchData();
    }
  }, [tipoUsuario]);

  useEffect(() => {
    const filtroLower = filtroTexto.toLowerCase();

    const filtrado = todosProcessos.filter(p =>
      p.numero.toLowerCase().includes(filtroLower) ||
      p.assunto.toLowerCase().includes(filtroLower) ||
      p.statusProcesso.toLowerCase().includes(filtroLower) ||
      p.orgaoResponsavel.toLowerCase().includes(filtroLower) ||
      p.createdAt.toLowerCase().includes(filtroLower)
    );

    setProcessos(filtroTexto ? filtrado : todosProcessos);
  }, [filtroTexto, todosProcessos]);

  const fetchData = async () => {
    try {
      const data = (tipoUsuario === 'procurador')
        ? await getProcessosPrivados()
        : await getProcessosPrivadosCliente();

      const processosComInfo = await Promise.all(
        data.map(async (p) => {
          try {
            const [documentos, prazos] = await Promise.all([
              listarDocumentosPorProcesso(p.id),
              listarPrazosPorProcesso(p.id)
            ]);

            let usuarios = [];
            if (!p.clientes || p.clientes.length === 0) {
              usuarios = await getNomeClientes(p.id);
            }

            return { ...p, documentos, prazos, usuarios };
          } catch (err) {
            console.error(`Erro ao buscar info do processo ${p.id}:`, err);
            return { ...p, documentos: [], prazos: [], usuarios: [] };
          }
        })
      );

      setTodosProcessos(processosComInfo);
      setProcessos(processosComInfo);
    } catch (err) {
      console.error("Erro ao buscar processos:", err);
    }
  };



  const handleEdit = (processo) => {
    setSelectedProcesso(processo);
    setModalEditOpen(true);
  };

  const handleSaveEdit = async (updated) => {
    try {
      await updateProcesso(updated.id, updated);
      setModalEditOpen(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao salvar edição:", err);
    }
  };

  const handleRemove = (processo) => {
    setSelectedProcesso(processo);
    setModalRemoveOpen(true);
  };

  const handleEditPrazo = (prazo) => {
    setPrazoParaEditar(prazo);
    setModalPrazoOpen(true);
  };

  const handleDeletePrazo = async (prazoId) => {
    if (!window.confirm("Tem certeza que deseja remover este prazo?")) return;

    try {
      await removerPrazo(prazoId);
      fetchData();
    } catch (err) {
      console.error("Erro ao deletar prazo:", err);
      alert("Erro ao deletar prazo.");
    }
  };

  const handleSaveRemove = async () => {
    try {
      await deleteProcesso(selectedProcesso.id);
      setModalRemoveOpen(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao salvar edição:", err);
    }
  };

  const handleAddClient = (processo) => {
    setSelectedProcesso(processo);
    setModalAddClient(true);
  }

  const handleSaveAddClient = async (dados) => {
    try {
      const cliente = await getClientePorUsuarioId(dados.clienteId);

      const dadosParaSalvar = {
        processoId: dados.processoId,
        clienteId: cliente.id,
      };
      await createRelation(dadosParaSalvar);
      setModalAddClient(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao criar relacao:", err);
    }
  };


  const handleDistributeProcess = (processo) => {
    setSelectedProcesso(processo);
    setModalDistributeProcess(true);
  };

  const handleSaveDistributeProcess = async (procuradorId) => {
    try {
      await updateProcesso(selectedProcesso.id, { procuradorId });
      setModalDistributeProcess(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao distribuir processo:", err);
    }
  };

  const handleDownload = async (caminho, nome) => {


    try {
      const response = await fetch(`${apiUrl}/documento/download/${caminho}`, {
        headers: {
          Authorization: token,
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao baixar o documento');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = nome;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao fazer download:', err);
      alert('Erro ao fazer download do documento.');
      alert(err.message);
    }
  };

  const handleAddDocumento = (processo) => {
    setProcessoParaDocumento(processo);
    setModalAddDocOpen(true);
  };

  const handleRemoveDocumento = async (documentoId) => {
    try {
      await removerDocumento(documentoId);
      fetchData();
    } catch (err) {
      console.error("Erro ao remover documento:", err);
      alert("Erro ao remover documento.");
    }
  };

  const handleSaveDocumento = async (formData) => {
    try {
      const processoId = formData.get("processoId");

      const response = await fetch(`${apiUrl}/documentos/upload/${processoId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar documento.");
      }

      fetchData();
    } catch (err) {
      console.error("Erro ao adicionar documento:", err);
      alert("Erro ao adicionar documento.");
    }
  };

  const handleAddPrazo = (processo) => {
    setProcessoParaPrazo(processo);
    setModalPrazoOpen(true);
  }

  const handlePushPrazo = async (formData) => {
    try {
      await criarPrazos(formData);
      setModalPrazoOpen(false);
      fetchData();
    } catch (err) {
      console.error("Erro ao salvar prazo:", err);
      alert("Erro ao salvar prazo.");
    }
  };
  const getNomeClientes = async (processoId) => {
    try {
      const clienteIds = await listarPorProcesso([processoId]);

      const usuarioIds = await getUsuarioIds(clienteIds);
      const usuarios = await getUsuariosPorIds(usuarioIds);
      return usuarios;
    } catch (error) {
      console.error("Erro ao obter nomes dos clientes:", error);
      return [];
    }
  };

  const removeCliente = async (usuarioId, processoId) => {
    try {
      const clienteId = await getClientePorUsuarioId(usuarioId);  
      
      return await removerRelacao(clienteId.id, processoId);
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      return;
    }
  };


  return (

    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Meus Processos</h2>

      {tipoUsuario === 'procurador' && (
        <Link
          to="/cadastrar-processos"
          className="flex items-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded transition mb-6"
          title="Cadastrar novo processo"
        >
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar
        </Link>
      )}

      <input
        type="text"
        placeholder="Buscar por número, assunto, status, órgão ou data de criação"
        value={filtroTexto}
        onChange={(e) => setFiltroTexto(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full"
      />


      <ul className="space-y-4">
        {processos.map((p) => (
          <li
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="mb-2 text-lg font-semibold text-indigo-700">
              {p.numero} - {p.assunto}
            </div>

            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Órgão Responsável:</span> {p.orgaoResponsavel}
            </div>

            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Status:</span> {p.statusProcesso}
            </div>

            <div className="text-sm text-gray-500 mb-3">
              <span className="font-medium">Criado em:</span> {new Date(p.createdAt).toLocaleDateString()}
            </div>

            <div className="mb-3">
              <span className="font-medium text-gray-800">Clientes:</span>
              {p.clientes && p.clientes.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700 ml-2 mt-1">
                  {p.clientes.map((cliente) => (
                    <li key={cliente.id}>{cliente.nome}</li>
                  ))}
                </ul>
              ) : p.usuarios && p.usuarios.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700 ml-2 mt-1">
                  {p.usuarios.map((usuario) => (
                    <li key={usuario.id} className="relative flex items-center gap-1">
                      {usuario.nome}
                      {tipoUsuario === 'procurador' && (
                        <button
                          onClick={() => {
                            removeCliente(usuario.id, p.id);
                            console.log(usuario.id, p.id)
                            fetchData();
                          }} 
                          className="text-red-600 hover:text-red-800 text-xs"
                          title="Remover cliente"
                        >
                          🗑️
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500 ml-2">Nenhum cliente vinculado.</div>
              )}
            </div>


            <div>
              <span className="font-medium text-gray-800">Prazos:</span>

              {p.prazos.length === 0 ? (
                <div className="text-gray-500 text-sm">Nenhum prazo encontrado.</div>
              ) : (
                p.prazos.map((prazo) => (
                  <div
                    key={prazo.id}
                    className="relative bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg px-2 py-1 shadow-sm text-sm w-48"
                  >
                    <div className="font-medium">{prazo.tipoPrazo}</div>
                    <div className="text-xs">
                      {new Date(prazo.dataVencimento).toLocaleDateString()}
                    </div>

                    {tipoUsuario === 'procurador' && (
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          onClick={() => handleDeletePrazo(prazo.id)}
                          className="text-red-600 hover:text-red-800 text-xs"
                          title="Remover prazo"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}

            </div>




            {tipoUsuario === 'procurador' && (
              <div className="text-sm text-gray-700 mb-3">
                <span className="font-medium text-gray-800">Documentos:</span>
                {Array.isArray(p.documentos) && p.documentos.length > 0 ? (
                  <ul className="ml-5 mt-1 space-y-1">
                    {p.documentos.map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between">
                        <button
                          onClick={() => handleDownload(doc.caminho, doc.nome)}
                          className="text-blue-700 hover:underline text-sm"
                        >
                          {doc.nome}
                        </button>
                        <button
                          onClick={() => handleRemoveDocumento(doc.id)}
                          title="Remover documento"
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="ml-5 mt-1 text-gray-500">Nenhum documento disponível.</p>
                )}
              </div>
            )}





            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleEdit(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Editar
              </button>
            )}

            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleRemove(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Remover
              </button>
            )}

            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleAddClient(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Adicionar Clientes
              </button>
            )}

            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleDistributeProcess(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Distribuir Processo
              </button>
            )}

            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleAddDocumento(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Adicionar Documento
              </button>
            )}

            {tipoUsuario === 'procurador' && (
              <button
                onClick={() => handleAddPrazo(p)}
                className="mr-2 text-sm text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md transition"
              >
                Adicionar Prazo
              </button>
            )}


          </li>
        ))}
      </ul>

      <EditProcessModal
        isOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        processo={selectedProcesso}
        onSave={handleSaveEdit}
      />
      <RemoveProcessModal
        isOpen={modalRemoveOpen}
        onClose={() => setModalRemoveOpen(false)}
        processo={selectedProcesso}
        onRemove={handleSaveRemove}
      />
      <AddClientModal
        isOpen={modalAddClient}
        onClose={() => setModalAddClient(false)}
        processo={selectedProcesso}
        onSave={handleSaveAddClient}
      />

      <DistributeModal
        isOpen={modalDistributeProcess}
        onClose={() => setModalDistributeProcess(false)}
        processo={selectedProcesso}
        onSave={handleSaveDistributeProcess}
      />

      {modalAddDocOpen && (
        <AddDocumentModal
          isOpen={modalAddDocOpen}
          onClose={() => setModalAddDocOpen(false)}
          processoId={processoParaDocumento?.id}
          onSave={handleSaveDocumento}
        />
      )}

      <AddPrazoModal
        isOpen={modalPrazoOpen}
        onClose={() => setModalPrazoOpen(false)}
        processoId={processoParaPrazo?.id}
        onSave={handlePushPrazo}
      />

    </div>




  );

}

export default Processos;
