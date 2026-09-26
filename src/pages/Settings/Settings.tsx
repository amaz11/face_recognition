import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../Components/PageHeader";
import InputField from "../../Components/textfield/InputField";
import {
  useGetDataQuery,
  useUpdateDataMutation,
  useDeleteDataMutation,
} from "../../service/endpoint";

const Settings = () => {
  const { data, isLoading, isFetching } = useGetDataQuery({
    endpoint: "settings/face-threshold",
    tags: ["face-threshold"],
  });
  const [updateData, { isLoading: isSaving }] = useUpdateDataMutation();
  const [deleteData, { isLoading: isResetting }] = useDeleteDataMutation();

  const [value, setValue] = useState<number | string>("");

  useEffect(() => {
    if (data?.data?.threshold !== undefined) {
      setValue(data.data.threshold);
    }
  }, [data]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateData({
        endpoint: "settings/face-threshold",
        data: { value: Number(value) },
        tags: ["face-threshold"],
      }).unwrap();
      toast.success(res?.message || "Threshold updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update threshold");
    }
  };

  const handleReset = async () => {
    try {
      const res = await deleteData({
        endpoint: "settings/face-threshold",
        tags: ["face-threshold"],
      }).unwrap();
      toast.success(res?.message || "Threshold reset to default");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset threshold");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Global configuration shared across every exam and every examinee - not per exam."
      />
      <section className="max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/60">
        <h3 className="mb-1 text-lg font-semibold text-slate-900">
          Face Match Threshold
        </h3>
        <p className="mb-4 text-sm text-slate-500">
          Minimum face-match percentage the mobile app reports at login. Applies
          globally to every registration, regardless of exam.
        </p>
        {isLoading || isFetching ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : (
          <form onSubmit={handleSave}>
            <InputField
              label="Threshold (%)"
              type="number"
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min={0}
              star={true}
            />
            <div className="mt-4 flex gap-3">
              <button
                disabled={isSaving}
                className="px-8 py-1.5 font-semibold btn-primary"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                disabled={isResetting}
                onClick={handleReset}
                className="rounded border border-slate-300 px-8 py-1.5 font-semibold text-slate-600 hover:bg-slate-50"
              >
                {isResetting ? "Resetting..." : "Reset to default"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Settings;
