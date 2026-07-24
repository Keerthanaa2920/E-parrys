import React, { useState, useEffect } from 'react';
import {
  FiUserCheck, FiCopy, FiSend, FiFileText, FiCheck,
  FiEye, FiClock, FiCheckCircle, FiXCircle,
  FiSearch, FiExternalLink, FiShare2,
  FiMail, FiMapPin, FiKey, FiUser
} from 'react-icons/fi';
import { mockDbService, type IVendorOnboardingRequest } from '../../services/mockDbService';

export const VendorOnboarding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forms' | 'requests'>('requests');
  const [requests, setRequests] = useState<IVendorOnboardingRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Share Link State
  const shareableUrl = `${window.location.origin}/vendor-onboarding`;
  const [copiedLink, setCopiedLink] = useState(false);
  const [sendEmailInput, setSendEmailInput] = useState('');
  const [emailSentToast, setEmailSentToast] = useState(false);

  // Modal State
  const [selectedReq, setSelectedReq] = useState<IVendorOnboardingRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [approvedCredsModal, setApprovedCredsModal] = useState<{ email: string; pass: string; company: string } | null>(null);

  const loadRequests = () => {
    setRequests(mockDbService.getVendorRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSendEmailLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendEmailInput.trim()) return;
    setEmailSentToast(true);
    setTimeout(() => {
      setEmailSentToast(false);
      setSendEmailInput('');
    }, 3000);
  };

  const handleApprove = (req: IVendorOnboardingRequest) => {
    const generatedPass = `Parrys@${Math.floor(1000 + Math.random() * 9000)}`;
    const updated = mockDbService.updateVendorRequestStatus(req.id, 'approved', generatedPass);
    if (updated) {
      setApprovedCredsModal({
        email: updated.email,
        pass: generatedPass,
        company: updated.companyName
      });
      loadRequests();
    }
  };

  const handleReject = (reqId: string) => {
    if (window.confirm("Are you sure you want to reject this vendor onboarding request?")) {
      mockDbService.updateVendorRequestStatus(reqId, 'rejected', undefined, 'Verification details incomplete');
      loadRequests();
      if (selectedReq?.id === reqId) {
        setShowDetailModal(false);
      }
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch =
      req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 uppercase tracking-wider mb-1">
            <FiUserCheck className="h-4 w-4" />
            <span>Admin Control Tower</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-serif">
            Vendor Onboarding Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Share standalone onboarding links with suppliers, review applications, and issue login credentials.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-orange-50/70 p-1.5 rounded-xl border border-orange-100">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-white text-orange-600 shadow-xs border border-orange-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiUserCheck className="h-4 w-4" />
            <span>Requests Received</span>
            {pendingCount > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forms'
                ? 'bg-white text-orange-600 shadow-xs border border-orange-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiFileText className="h-4 w-4" />
            <span>Forms & Share Link</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FORMS & SHARE LINK */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          {/* Share Link Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 md:p-8 text-white shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                <FiShare2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Shareable Vendor Onboarding Link</h3>
                <p className="text-xs text-white/90">
                  Send this link to prospective manufacturer brands or wholesale suppliers. Only the onboarding form will be shown.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="w-full sm:flex-1 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 font-mono text-xs text-white truncate flex items-center justify-between">
                <span className="truncate">{shareableUrl}</span>
                <a
                  href={shareableUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-orange-200 p-1 shrink-0"
                  title="Open in new tab"
                >
                  <FiExternalLink className="h-4 w-4" />
                </a>
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {copiedLink ? (
                  <>
                    <FiCheck className="h-4 w-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Email Dispatch Box */}
            <form onSubmit={handleSendEmailLink} className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:flex-1 relative">
                <FiMail className="absolute left-3.5 top-3.5 text-white/60 h-4 w-4" />
                <input
                  type="email"
                  value={sendEmailInput}
                  onChange={(e) => setSendEmailInput(e.target.value)}
                  placeholder="Enter vendor email address (e.g. sales@vendorcompany.com)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/30 text-xs text-white placeholder-white/60 outline-none focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-900 text-white hover:bg-black px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiSend className="h-3.5 w-3.5" />
                <span>Send Invitation Email</span>
              </button>
            </form>

            {emailSentToast && (
              <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 animate-bounce">
                <FiCheckCircle className="h-4 w-4" />
                <span>Onboarding Link Invitation Email Sent Successfully!</span>
              </div>
            )}
          </div>

          {/* Form Preview Section */}
          <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-orange-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base font-serif">Onboarding Form Live Preview</h3>
              <a
                href="/vendor-onboarding"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1 font-mono"
              >
                <span>View Full Page</span>
                <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="border border-orange-100 rounded-xl overflow-hidden shadow-inner max-h-[600px] overflow-y-auto bg-orange-50/20 p-4">
              <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-gray-200 space-y-4 text-xs">
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-lg font-serif text-gray-900">Wholesale Supplier Onboarding</h4>
                  <p className="text-gray-500 text-xs">Verify company licenses, yard dispatches capacity, and tax audits.</p>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-gray-700">1. CORPORATE SALES OFFICER PERSONAL INFO</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                    <div className="p-2 border border-gray-200 rounded">Full Name *</div>
                    <div className="p-2 border border-gray-200 rounded">Corporate Email *</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-gray-700">2. CORE BUSINESS DETAILS</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                    <div className="p-2 border border-gray-200 rounded">Company Name *</div>
                    <div className="p-2 border border-gray-200 rounded">GSTIN Number *</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-gray-700">3. DOCUMENT LICENSE UPLOADS</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400">
                    <div className="p-2 border border-dashed border-gray-300 rounded text-center">GSTIN Audit Cert</div>
                    <div className="p-2 border border-dashed border-gray-300 rounded text-center">MSME License</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REQUESTS RECEIVED */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'pending'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Pending ({requests.filter(r => r.status === 'pending').length})
              </button>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'all'
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({requests.length})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'approved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Approved ({requests.filter(r => r.status === 'approved').length})
              </button>
              <button
                onClick={() => setFilterStatus('rejected')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'rejected'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Rejected ({requests.filter(r => r.status === 'rejected').length})
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vendor name, GSTIN..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-orange-100 rounded-xl outline-none focus:border-orange-500 font-sans"
              />
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-50/50 border-b border-orange-100 text-gray-500 font-mono font-bold text-[11px] uppercase tracking-wider">
                    <th className="p-4">App Ref & Date</th>
                    <th className="p-4">Company & Officer</th>
                    <th className="p-4">GSTIN & Type</th>
                    <th className="p-4">Sectors & Location</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100/60 text-xs">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400 font-mono">
                        No vendor onboarding requests found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-orange-50/30 transition-colors">
                        {/* Ref & Date */}
                        <td className="p-4">
                          <div className="font-mono font-bold text-gray-900">{req.id}</div>
                          <div className="text-[10px] text-gray-400 font-mono mt-0.5">{req.dateSubmitted}</div>
                        </td>

                        {/* Company & Officer */}
                        <td className="p-4">
                          <div className="font-bold text-gray-900 font-serif text-sm">{req.companyName}</div>
                          <div className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                            <FiUser className="text-orange-500 h-3 w-3" />
                            <span>{req.officerName} ({req.email})</span>
                          </div>
                        </td>

                        {/* GSTIN & Type */}
                        <td className="p-4 font-mono">
                          <div className="font-bold text-gray-800">{req.gstin}</div>
                          <div className="text-[10px] text-gray-500 font-sans">{req.businessStructure}</div>
                        </td>

                        {/* Sectors & Location */}
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {req.sourcingSectors.map(s => (
                              <span key={s} className="bg-orange-100/70 text-orange-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-1">{req.city}, {req.state}</div>
                        </td>

                        {/* Status Badge */}
                        <td className="p-4 text-center">
                          {req.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono">
                              <FiClock className="h-3 w-3 animate-pulse text-amber-600" />
                              <span>Pending Review</span>
                            </span>
                          )}
                          {req.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono">
                              <FiCheckCircle className="h-3 w-3 text-emerald-600" />
                              <span>Approved & Issued</span>
                            </span>
                          )}
                          {req.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono">
                              <FiXCircle className="h-3 w-3 text-rose-600" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedReq(req);
                                setShowDetailModal(true);
                              }}
                              className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                              title="View Application Details"
                            >
                              <FiEye className="h-3.5 w-3.5" />
                              <span>Inspect</span>
                            </button>

                            {req.status === 'pending' && (
                              <button
                                onClick={() => handleApprove(req)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                              >
                                <FiCheck className="h-3.5 w-3.5" />
                                <span>Approve</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Inspection Modal */}
      {showDetailModal && selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          />
          <div className="bg-white rounded-2xl border border-orange-100 p-6 md:p-8 max-w-2xl w-full shadow-2xl relative z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-orange-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-orange-600 font-mono uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                  REF: {selectedReq.id} • SUBMITTED: {selectedReq.dateSubmitted}
                </span>
                <h3 className="text-xl font-bold font-serif text-gray-900 mt-1">
                  {selectedReq.companyName}
                </h3>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-900 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Officer & Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-orange-50/50 p-4 rounded-xl space-y-2 border border-orange-100">
                <div className="font-bold text-gray-900 font-serif border-b border-orange-100 pb-1">
                  Corporate Officer Info
                </div>
                <div>Name: <strong>{selectedReq.officerName}</strong></div>
                <div>Email: <strong className="font-mono">{selectedReq.email}</strong></div>
                <div>Mobile: <strong className="font-mono">{selectedReq.phone}</strong></div>
              </div>

              <div className="bg-orange-50/50 p-4 rounded-xl space-y-2 border border-orange-100">
                <div className="font-bold text-gray-900 font-serif border-b border-orange-100 pb-1">
                  Core Business Audit
                </div>
                <div>GSTIN: <strong className="font-mono">{selectedReq.gstin}</strong></div>
                <div>Structure: <strong>{selectedReq.businessStructure}</strong></div>
                <div>Year Established: <strong>{selectedReq.yearEstablished}</strong></div>
                {selectedReq.panNumber && <div>PAN: <strong className="font-mono">{selectedReq.panNumber}</strong></div>}
              </div>
            </div>

            {/* Location & Sectors */}
            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-xs border border-gray-200">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <FiMapPin className="text-orange-500" />
                <span>Service & Logistics Areas</span>
              </div>
              <div className="text-gray-600 pl-5">{selectedReq.serviceAreas}</div>
              <div className="text-gray-500 text-[11px] pl-5 font-mono">
                Location: {selectedReq.city}, {selectedReq.state} - PIN: {selectedReq.pincode}
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-gray-900">Submitted Licenses & Documents</div>
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 border border-orange-100 rounded-xl bg-orange-50/30 flex items-center justify-between">
                  <span>GSTIN Audit Cert</span>
                  <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                </div>
                <div className="p-3 border border-orange-100 rounded-xl bg-orange-50/30 flex items-center justify-between">
                  <span>MSME License</span>
                  <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                </div>
                <div className="p-3 border border-orange-100 rounded-xl bg-orange-50/30 flex items-center justify-between">
                  <span>Corporate Logo</span>
                  <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                </div>
                {selectedReq.catalogueFile && (
                  <div className="p-3 border border-orange-100 rounded-xl bg-orange-50/30 flex items-center justify-between">
                    <span>Product Catalogue</span>
                    <span className="text-emerald-600 font-bold">✓ Uploaded</span>
                  </div>
                )}
              </div>
            </div>

            {/* Approval Credentials Notice if Approved */}
            {selectedReq.status === 'approved' && selectedReq.generatedPassword && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs space-y-1 font-mono">
                <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <FiKey /> Active Vendor Login Credentials
                </div>
                <div>Vendor Login Email: <strong>{selectedReq.email}</strong></div>
                <div>Initial Password: <strong className="text-emerald-700">{selectedReq.generatedPassword}</strong></div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-orange-100">
              {selectedReq.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedReq);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <FiCheck className="h-4 w-4" />
                    <span>Approve & Issue Credentials</span>
                  </button>
                  <button
                    onClick={() => handleReject(selectedReq.id)}
                    className="px-5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-5 border border-orange-200 hover:bg-orange-50 text-gray-700 rounded-xl text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Newly Approved Credentials Display Modal */}
      {approvedCredsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
            onClick={() => setApprovedCredsModal(null)}
          />
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 md:p-8 max-w-md w-full shadow-2xl relative z-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
              <FiCheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest font-mono">
                VENDOR ACCOUNT APPROVED
              </span>
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Credentials Generated!
              </h3>
              <p className="text-xs text-gray-500">
                Vendor credentials for <strong>{approvedCredsModal.company}</strong> have been created and activated.
              </p>
            </div>

            <div className="bg-gray-900 text-white p-4 rounded-xl text-xs font-mono text-left space-y-2 border border-gray-800 shadow-inner">
              <div className="text-orange-400 font-bold border-b border-gray-800 pb-1">
                Vendor Login Credentials
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vendor Email:</span>
                <strong className="text-white">{approvedCredsModal.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Password:</span>
                <strong className="text-emerald-400">{approvedCredsModal.pass}</strong>
              </div>
            </div>

            <button
              onClick={() => setApprovedCredsModal(null)}
              className="w-full bg-gray-900 text-white hover:bg-black py-3.5 rounded-xl text-xs font-bold uppercase transition-colors shadow-sm cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOnboarding;
